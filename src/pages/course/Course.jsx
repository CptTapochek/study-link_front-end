import React, {useState} from "react";
import style from "../course/course.module.css";
import {NavLink} from 'react-router-dom';


const Course = ({setCourseLink}) => {
    const [course, setCourse] = useState({
        id: 0,
        title: "Random course title 1",
        link: "random-course-1",
        progress: 3,
        processes: 8,
        subjects: [
            {
                id: "5454",
                type: "learn",
                title: "olarit cu Brad Pit",
                files: [
                    {
                        id: "1234",
                        title: "example-file-title1",
                        type: "pdf",
                        download_link: "file_title172h3hf",
                    },
                    {
                        id: "23144",
                        title: "example-file-title2",
                        type: "zip",
                        download_link: "file_title172h3hf",
                    },
                    {
                        id: "4545",
                        title: "example-file-title3",
                        type: "pdf",
                        download_link: "file_title172h3hf",
                    }
                ]
            },
            {
                id: "32321",
                type: "quiz",
                completed: true,
                title: "CD PROJECT BLUE",
                result: "Pass",
                score: 80,
                max_score: 100,
            },
            {
                id: "67765",
                type: "learn",
                title: "Urinasoft",
                files: [
                    {
                        id: "6557",
                        title: "example-file-title123",
                        type: "pdf",
                        download_link: "fdhdgh67h5",
                    },
                    {
                        id: "45674",
                        title: "example-file-title243534",
                        type: "zip",
                        download_link: "678453tgg65g",
                    },
                ]
            },
            {
                id: "765756",
                type: "learn",
                title: "TimeSaver",
                files: [
                    {
                        id: "657568",
                        title: "example-file-blablalbal",
                        type: "pdf",
                        download_link: "324hdgh42367h5",
                    },
                ]
            },
            {
                id: "421412",
                type: "quiz",
                completed: true,
                title: "Shocker test",
                result: "Fail",
                score: 30,
                max_score: 100,
            },
            {
                id: "576556",
                type: "quiz",
                completed: false,
                title: "Super test",
                quiz_link: "bve5g45g4h67h"
            },
        ]
    });

    const subjectElements = course["subjects"].map(
        item => <SubjectItem
            key={item.id}
            subjectTitle={item.title}
            type={item.type}
            files={item.files}
            testResult={item.result}
            testScore={item.score}
            testMaxScore={item.max_score}
            quizLink={item.quiz_link}
            completed={item.completed}
        />
    );

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

const SubjectItem = (props) => {
    let Subject;

    if (props.type === "learn") {
        const subjectFiles = props.files.map(
            item => <SubjectFiles
                key={Math.random().toString()}
                title={item.title}
                type={item.type}
            />
        );
        const downloadFileButtons = props.files.map(
            item => <DownloadFileButtons
                key={Math.random().toString()}
                downloadLink={item.download_link}
            />
        );

        Subject = (
            <div className={style.subject} key={props.id}>
                <div className={style.subjectTitle}>
                    <div><i/><p>{props.subjectTitle}</p></div>
                </div>
                <div className={style.filesList}>
                    {subjectFiles}
                </div>
                <div className={style.actionButtons}>
                    {downloadFileButtons}
                </div>
            </div>
        );
    } else if (props.type === "quiz") {
        if(props.completed === true) {
            Subject = (
                <div className={style.subject} key={props.id}>
                    <div className={style.testTitle}>
                        <i/><p>{props.subjectTitle}</p>
                    </div>
                    <div className={style.testResult}>
                        <p className={`${props.testResult === "Pass" ? style.pass : style.fail}`}>
                            {props.testResult}
                        </p>
                    </div>
                    <div className={style.testScore}>
                        <i/><p>{props.testScore}/{props.testMaxScore}</p>
                    </div>
                </div>
            );
        } else {
            Subject = (
                <div className={style.subject} key={props.id}>
                    <div className={style.testTitle}>
                        <i/><p>{props.subjectTitle}</p>
                    </div>
                    <div className={style.testResult}></div>
                    <NavLink className={style.testOpen} to={props.quizLink}>
                        <i/><p>Open</p>
                    </NavLink>
                </div>
            );
        }
    }
    return Subject;
}

const SubjectFiles = (props) => {
    return (<div className={style.file}><p>{props.title}</p></div>);
}
const DownloadFileButtons = (props) => {
    return (<div className={style.download}><i/>Download</div>);
}

export default Course;
