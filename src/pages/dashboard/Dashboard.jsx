import style from "./dashboard.module.css";
import { setGlobalState } from "../../state/header";
import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {DASHBOARD_DATA} from "../../query/user";


const Dashboard = () => {
    const [students, setStudents] = useState(0);
    const [teachers, setTeachers] = useState(0);
    const [progress, setProgress] = useState(0);
    const [courses, setCourses] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));
    const {data, loading, error} = useQuery(DASHBOARD_DATA, {
        variables: {
            userId: user["_id"]
        }
    });

    useEffect(() => {
        setGlobalState("headerTitle", "Dashboard");
        if(!loading) {
            setCourses(data["dashboardData"]["courses"]);
            setStudents(data["dashboardData"]["students"]);
            setTeachers(data["dashboardData"]["teachers"]);
            setProgress(data["dashboardData"]["progress"]);
        }
    }, [data]);


    return (
        <div className={style.main}>
            {loading ? <div className="loader"/> : <div className={style.row}>
                <div className={`${style.card} ${style.studentsCard}`}>
                    <div className={style.hexagonBack}><i/></div>
                    <div className={style.cardTitle}>Total Students</div>
                    <div className={style.cardValue}>{students}</div>
                </div>
                <div className={`${style.card} ${style.teachersCard}`}>
                    <div className={style.hexagonBack}><i/></div>
                    <div className={style.cardTitle}>Total Teachers</div>
                    <div className={style.cardValue}>{teachers}</div>
                </div>
                <div className={`${style.card} ${style.coursesCard}`}>
                    <div className={style.hexagonBack}><i/></div>
                    <div className={style.cardTitle}>Total Courses</div>
                    <div className={style.cardValue}>{courses}</div>
                </div>
                <div className={style.largeCard}>
                    <div className={style.textSection}>
                        <div className={style.largeCardTitle}>Courses Activities</div>
                        <div className={style.largeCardLegend}>
                            <p className={style.process}>Process</p>
                            <p className={style.inProcess}>In Process</p>
                        </div>
                    </div>
                    <div className={style.circularChart}>
                        <div className={style.circleWrap}>
                            <div className={style.circle}>
                                <div className={`${style.mask} ${style.full}`} style={{transform: "rotate(150deg)"}}>
                                    <div className={style.fill} style={{transform: "rotate(150deg)"}}/>
                                </div>
                                <div className={`${style.mask} ${style.half}`}>
                                    <div className={style.fill} style={{transform: "rotate(150deg)"}}/>
                                </div>
                                <div className={style.insideCircle}>82%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <div className={style.row}>

            </div>
        </div>
    );
};

export default Dashboard;