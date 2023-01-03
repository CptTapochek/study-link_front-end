import style from "./grades.module.css";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {setGlobalState} from "../../state/header";


const Grades = () => {
    useEffect(() => {
        setGlobalState("headerTitle", "Grades");
    });

    const [grades, setGrades] = useState([
        {
            id: 0,
            title: "Fake test",
            date: "13/11/2022",
            courseTitle: "Random course title",
            link: "fake-test-1",
            score: 80,
            maxScore: 100,
            passed: true
        },
        {
            id: 1,
            title: "Fake test 2",
            date: "05/11/2022",
            courseTitle: "Random course title 2",
            link: "fake-test-2",
            score: 32,
            maxScore: 100,
            passed: false
        },
        {
            id: 2,
            title: "Fake test 3",
            date: "25/10/2022",
            courseTitle: "Random course title 3",
            link: "fake-test-3",
            score: 12,
            maxScore: 100,
            passed: false
        }
    ]);

    const gradeElements = grades.map(
        item => <GradeItem
            key={item.id.toString()}
            id={item.id}
            title={item.title}
            date={item.date}
            courseTitle={item.courseTitle}
            link={item.link}
            score={item.score}
            maxScore={item.maxScore}
            passed={item.passed}
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
            <div className={style.gradesList}>{gradeElements}</div>
        </div>
    );
};

const GradeItem = (props) => {
    return <NavLink className={style.grade} to={`test/${props.link}`}>
        <div className={style.gradeTitle}><i/><p>{props.title}</p></div>
        <div className={style.courseTitle}>{props.courseTitle}</div>
        <div className={style.gradeSubmitted}>{props.date}</div>
        <div className={style.gradeScore}>{props.score}/{props.maxScore}</div>
        <div className={style.gradeResult}>
            <p className={props.passed ? style.pass : style.fail}>{props.passed ? "Pass" : "Fail"}</p>
        </div>
    </NavLink>
}

export default Grades;