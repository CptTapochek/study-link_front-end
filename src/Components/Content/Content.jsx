import style from "./content.module.css";
import Courses from '../../pages/courses/Courses';


const Content = () => {

    return (
        <div className={style.main}>
            <div className={style.box}>
                <Courses/>
            </div>
        </div>
    );
};

export default Content;