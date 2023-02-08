import style from "./courses.module.css";
import React, {useEffect, useState} from "react";
import {setGlobalState} from "../../state/header";
import {COURSE_LIST} from "../../query/course";
import {useQuery} from "@apollo/client";
import {setCourseIdState} from "../../state/course";
import {NavLink} from "react-router-dom";


const Courses = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [courses, setCourses] = useState([]);
    const {data, loading, error} = useQuery(COURSE_LIST, {
        variables: {
            userId: user["_id"]
        }
    });
    const isTeacher = user["type"] === "TEACHER";


    useEffect(() => {
        setGlobalState("headerTitle", "Courses");
        if(!loading) {
            setCourses(data["getCoursesList"]);
        }
    }, [data]);

    const courseElements = courses.map(
        item => <CourseItem
            key={item._id.toString()}
            id={item._id}
            title={item.title}
            progress={item.progress}
            processes={item.processes}
            isTeacher={isTeacher}
        />
    );

    return (
        <div className={style.main}>
            <div className={style.infoBlock}>
                <p className={style.courseName}>Course Name</p>
                <p className={style.progress}>Progress</p>
            </div>
            <div className={style.coursesList}>{courseElements}</div>
        </div>
    );
};

const CourseItem = (props) => {
    const percent = props.progress / props.processes * 100;


    return (
        <NavLink to={`/courses/course/${props.id}`} className={style.course}>
            <div className={style.courseTitle}><p>{props.title}</p></div>
            <div className={style.loading}>
                <div className={style.loadingBar} style={{width: `${props.isTeacher ? 100 : percent}%`}}/>
            </div>
            <div className={style.count}>{props.isTeacher ? props.processes : props.progress + "/" + props.processes}</div>
        </NavLink>
    );
}


export default Courses;