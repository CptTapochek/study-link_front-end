import style from './side-bar.module.css';
import {NavLink} from 'react-router-dom';


const SideBar = () => {

    return (
        <div className={style.main}>
            <NavLink to={"/"} className={style.logo}><b>S</b>tudyLink</NavLink>
            <div className={style.navigationButtons}>
                {/* dashboard */}
                <NavLink to={"/dashboard"} className={style.dashboardBTN}>
                    <div className={style.section}>
                        <i/><div className={style.navigationTitle}>Dashboard</div>
                    </div>
                </NavLink>
                {/* Files */}
                <NavLink to={"/files"} className={style.filesBTN}>
                    <div className={style.section}>
                        <i/><div className={style.navigationTitle}>Files</div>
                    </div>
                </NavLink>
                {/* Courses */}
                <NavLink to={"courses"} className={style.coursesBTN}>
                    <div className={style.section}>
                        <i/><div className={style.navigationTitle}>Courses</div>
                    </div>
                </NavLink>
                {/* Grades */}
                <NavLink to={"grades"} className={style.gradesBTN}>
                    <div className={style.section}>
                        <i/><div className={style.navigationTitle}>Grades</div>
                    </div>
                </NavLink>
            </div>
            <div className={style.navigationButtons}>
                {/* Notifications.jsx */}
                <NavLink to={"notifications"} className={style.notificationsBTN}>
                    <div className={style.section}>
                        <i/><div className={style.navigationTitle}>Notifications</div>
                    </div>
                </NavLink>
                {/* Settings */}
                <NavLink to={"settings"} className={style.settingsBTN}>
                    <div className={style.section}>
                        <i/><div className={style.navigationTitle}>Settings</div>
                    </div>
                </NavLink>
                {/* Profile */}
                <NavLink to={"profile"} className={style.profileBTN}>
                    <div className={style.section}>
                        <i/><div className={style.navigationTitle}>Profile</div>
                    </div>
                </NavLink>
            </div>
            <a className={style.logout}>
                <i/>
                <div className={style.logoutTitle}>Logout</div>
            </a>
        </div>
    );
};

export default SideBar;