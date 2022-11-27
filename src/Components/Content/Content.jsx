import style from "./content.module.css";
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import Courses from '../../pages/courses/Courses';
import Course from '../../pages/course/Course';
import Dashboard from '../../pages/dashboard/Dashboard';
import Files from '../../pages/files/Files';
import Grades from '../../pages/grades/Grades';
import Notifications from '../../pages/notifications/Notifications';
import Settings from '../../pages/settings/Settings';
import Profile from '../../pages/profile/Profile';
import Quiz from "../../pages/quiz/Quiz";


const Content = () => {

    return (
        <div className={style.main}>
            <div className={style.box}>
                <Routes>
                    <Route path={"/*"} element={<Dashboard/>}/>
                    <Route path={"/files"} element={<Files/>}/>
                    <Route path={"/courses"} element={<Courses/>}/>
                    <Route path={"courses/course/*"} element={<Course/>}/>
                    <Route path={"courses/course/*"} element={<Course/>}/>
                    <Route path={"courses/course/quiz/*"} element={<Quiz/>}/>
                    <Route path={"/grades"} element={<Grades/>}/>
                    <Route path={"/notifications"} element={<Notifications/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                    <Route path={"/profile"} element={<Profile/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default Content;