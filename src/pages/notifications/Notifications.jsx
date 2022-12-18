import style from "./notifications.module.css";
import {setGlobalState} from "../../state/header";


const Notifications = () => {
    setGlobalState("headerTitle", "Notifications");

    return (
        <div className={style.main}>
            Notifications
        </div>
    );
};

export default Notifications;