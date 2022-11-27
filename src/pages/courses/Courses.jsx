import style from "./courses.module.css";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";


const Courses = () => {
    const [courses, setCourses] = useState([
        {
            id: 0,
            title: "Random course title 1",
            link: "random-course-1",
            progress: 3,
            processes: 8,
        },
        {
            id: 1,
            title: "Random course title 2",
            link: "random-course-2",
            progress: 7,
            processes: 9,
        },
        {
            id: 2,
            title: "Random course title 3",
            link: "random-course-3",
            progress: 2,
            processes: 12,
        }
    ]);

    const courseElements = courses.map(
        item => <CourseItem
            key={item.id.toString()}
            id={item.id}
            title={item.title}
            link={item.link}
            progress={item.progress}
            processes={item.processes}
        />
    );

    return (
        <div className={style.main}>
            <div className={style.title}>
                <div className={style.faculty}>Faculty: ETTI</div>
                <div className={style.semester}>I<sup>st</sup>semester</div>
            </div>
            <div className={style.coursesList}>{courseElements}</div>
        </div>
    );
};

const CourseItem = (props) => {
    const percent = props.progress / props.processes * 100;

    return <NavLink className={style.course} to={`course/${props.link}`}>
        <div className={style.courseTitle}><p>{props.title}</p></div>
        <div className={style.loading}>
            <div className={style.loadingBar} style={{width: `${percent}%`}}/>
        </div>
        <div className={style.count}>{props.progress}/{props.processes}</div>
    </NavLink>
}


export default Courses;