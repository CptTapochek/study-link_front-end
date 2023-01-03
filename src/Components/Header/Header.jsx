import style from './header.module.css';
import Calendar from '../Calendar/Calendar';
import React from "react";
import { useGlobalState} from "../../state/header";
import {useNavigate} from "react-router-dom";


const Header = ({calendar, setCalendar}) => {
    const headerTitle = useGlobalState("headerTitle")[0];
    const user = JSON.parse(localStorage.getItem("user"));
    const openCalendar = () => {
        setCalendar(<Calendar setCalendar={setCalendar}/>);
    };
    const navigate = useNavigate();

    return (
        <div className={style.header}>
            <div className={style.navigation}>
                {headerTitle}
                {
                    user["type"] === "TEACHER" && headerTitle === "Courses" ?
                    <div onClick={()=>navigate("courses/create-course")} className={style.createCourseBTN}>
                        Create Course
                    </div> : <div/>
                }
            </div>
            <div className={style.date} onClick={openCalendar}>
                <div className={style.calendarIcon}/>
                <div className={style.calendarTitle}>
                    30 Oct, 2022
                </div>
            </div>
        </div>
    );
};

export default Header;