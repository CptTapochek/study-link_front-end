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
    const date = new Date(Date.now());

    const getMonthTitle = (month) => {
        let monthTitle;
        switch (month) {
          case 0: monthTitle = "Jan"; break;
          case 1: monthTitle = "Feb"; break;
          case 2: monthTitle = "Mar"; break;
          case 3: monthTitle = "Apr"; break;
          case 4: monthTitle = "May"; break;
          case 5: monthTitle = "Jun"; break;
          case 6: monthTitle = "Jul"; break;
          case 7: monthTitle = "Aug"; break;
          case 8: monthTitle = "Sep"; break;
          case 9: monthTitle = "Oct"; break;
          case 10: monthTitle = "Nov"; break;
          case 11: monthTitle = "Dec"; break;
        }
        return monthTitle;
    }

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
                    {`${date.getDate()} ${getMonthTitle(date.getMonth())}, ${date.getFullYear()}`}
                </div>
            </div>
        </div>
    );
};

export default Header;