import style from "./courses.module.css";


const Courses = () => {

    return (
        <div className={style.main}>
            <div className={style.title}>
                <div className={style.faculty}>Faculty: ETTI</div>
                <div className={style.semester}>I<sup>st</sup>semester</div>
            </div>
            <div className={style.coursesList}>
                <a className={style.course}>
                    <div className={style.courseTitle}><p>Electronica industriala 2</p></div>
                    <div className={style.loading}>
                        <div className={style.loadingBar}/>
                    </div>
                    <div className={style.count}>7/14</div>
                </a>
                <a className={style.course}>
                    <div className={style.courseTitle}><p>Electronica industriala 2</p></div>
                    <div className={style.loading}>
                        <div className={style.loadingBar}/>
                    </div>
                    <div className={style.count}>7/14</div>
                </a>
            </div>
        </div>
    );
};

export default Courses;