import style from "./grades.module.css";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {setGlobalState} from "../../state/header";
import {useQuery} from "@apollo/client";
import {GRADES_LIST} from "../../query/grade";


const Grades = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const {data, loading, error} = useQuery(GRADES_LIST, {
        variables: {
            userId: user["_id"]
        }
    });
    useEffect(() => {
        setGlobalState("headerTitle", "Grades");
        if(!loading) {
            setGrades(data["getGrades"]);
        }
    }, [data]);

    const [grades, setGrades] = useState([]);

    const gradeElements = grades.map(
        item => <GradeItem
            key={Math.random().toString()}
            title={item.courseTitle}
            date={item.date}
            quizTitle={item.quizTitle}
            score={item.score}
            maxScore={item.maxScore}
            approve={item.approve}
        />
    );

    return (
        <div className={style.main}>
            <div className={style.infoBlock}>
                <p className={style.testName}>Test</p>
                <p className={style.course}>Course</p>
                <p className={style.date}>Submitted</p>
                <p className={style.score}>Score</p>
                <p className={style.passFail}>Pass/Fail</p>
            </div>
            <div className={style.gradesList}>{
                loading ? <div className="loader"/> : gradeElements
            }</div>
        </div>
    );
};

const GradeItem = (props) => {
    return <NavLink className={style.grade} to={`/courses`}>
        <div className={style.gradeTitle}><i/><p>{props.title}</p></div>
        <div className={style.courseTitle}>{props.quizTitle}</div>
        <div className={style.gradeSubmitted}>{`${props.date.day.toString().padStart(2, "0")}/${props.date.month.toString().padStart(2, "0")}/${props.date.year}`}</div>
        <div className={style.gradeScore}>{props.score}/{props.maxScore}</div>
        <div className={style.gradeResult}>
            <p className={props.approve ? style.pass : style.fail}>{props.approve ? "Pass" : "Fail"}</p>
        </div>
    </NavLink>
}

export default Grades;