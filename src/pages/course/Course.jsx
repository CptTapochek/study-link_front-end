import React, {useEffect, useState} from "react";
import style from "../course/course.module.css";
import {NavLink} from 'react-router-dom';
import {useQuery} from "@apollo/client";
import {GET_COURSE} from "../../query/course";


const Course = () => {
    const [course, setCourse] = useState([]);
    const courseID = window.location.pathname.split("/")[3].toString();
    const {data, loading, error} = useQuery(GET_COURSE, {
        variables: {
            id: courseID
        }
    });

    useEffect(() => {
        if(!loading) {
            setCourse(data["getCourse"]);
        }
    }, [data]);

    const subjectElements = course["subjects"] !== undefined ? course["subjects"].map(
        item => <SubjectItem
            key={item._id}
            _id={item._id}
            subjectTitle={item.title}
            type={item.type}
            files={item.files}
            state={item.type === "QUIZ" ? item.quiz_details.state : "none"}
            testScore={item.type === "QUIZ" ? item.quiz_details.score : "none"}
            testMaxScore={item.type === "QUIZ" ? item.quiz_details.max_score : "none"}
            completed={false}
        />
    ) : <div/>;

    return (
        <div className={style.main}>
            <div className={style.title}>
                <p>{course["title"]}</p>
            </div>
            <div className={style.infoBlock}>
                <p className={style.infoSubjectTitle}>Subject title</p>
                <p className={style.infoFiles}>Files</p>
                <p className={style.infoAction}>Action</p>
            </div>
            <div className={style.subjectsList}>
                {subjectElements}
            </div>
        </div>
    );
};

class SubjectItem extends React.Component {
    render() {
        let Subject;

        if (this.props.type === "LEARN") {
            const subjectFiles = this.props.files.map(
                item => <SubjectFiles
                    key={Math.random().toString()}
                    title={item.title}
                    type={item.type}
                />
            );
            const downloadFileButtons = this.props.files.map(
                item => <DownloadFileButtons
                    key={Math.random().toString()}
                />
            );

            Subject = (
                <div className={style.subject} key={this.props._id}>
                    <div className={style.subjectTitle}>
                        <div><i/><p>{this.props.subjectTitle}</p></div>
                    </div>
                    <div className={style.filesList}>
                        {subjectFiles}
                    </div>
                    <div className={style.actionButtons}>
                        {downloadFileButtons}
                    </div>
                </div>
            );
        } else if (this.props.type === "QUIZ") {
            if (this.props.completed === true) {
                Subject = (
                    <div className={style.subject} key={this.props._id}>
                        <div className={style.testTitle}>
                            <i/><p>{this.props.subjectTitle}</p>
                        </div>
                        <div className={style.testResult}>
                            <p className={`${this.props.state === "Pass" ? style.pass : style.fail}`}>
                                {this.props.state}
                            </p>
                        </div>
                        <div className={style.testScore}>
                            <i/><p>{this.props.testScore}/{this.props.testMaxScore}</p>
                        </div>
                    </div>
                );
            } else {
                Subject = (
                    <div className={style.subject} key={this.props._id}>
                        <div className={style.testTitle}>
                            <i/><p>{this.props.subjectTitle}</p>
                        </div>
                        <div className={style.testResult}></div>
                        <NavLink className={style.testOpen} to={`quiz/${this.props._id}`}>
                            <i/><p>Open</p>
                        </NavLink>
                    </div>
                );
            }
        }
        return Subject;
    }
}

const SubjectFiles = (props) => {
    return (<div className={style.file}><p>{props.title}</p></div>);
}
const DownloadFileButtons = (props) => {
    return (<div className={style.download}><i/>Download</div>);
}

export default Course;
