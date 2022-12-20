import style from "./dashboard.module.css";
import { setGlobalState } from "../../state/header";
import {useEffect} from "react";


const Dashboard = () => {
    useEffect(() => {
        setGlobalState("headerTitle", "Dashboard");
    });

    return (
        <div className={style.main}>
            <div className={style.row}>
                <div className={`${style.card} ${style.studentsCard}`}>
                    <div className={style.hexagonBack}><i/></div>
                    <div className={style.cardTitle}>Total Students</div>
                    <div className={style.cardValue}>1220</div>
                </div>
                <div className={`${style.card} ${style.teachersCard}`}>
                    <div className={style.hexagonBack}><i/></div>
                    <div className={style.cardTitle}>Total Teachers</div>
                    <div className={style.cardValue}>120</div>
                </div>
                <div className={`${style.card} ${style.coursesCard}`}>
                    <div className={style.hexagonBack}><i/></div>
                    <div className={style.cardTitle}>Total Courses</div>
                    <div className={style.cardValue}>12</div>
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
                                <div className={`${style.mask} ${style.full}`}>
                                    <div className={style.fill}/>
                                </div>
                                <div className={`${style.mask} ${style.half}`}>
                                    <div className={style.fill}/>
                                </div>
                                <div className={style.insideCircle}>75%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.row}>

            </div>
        </div>
    );
};

export default Dashboard;