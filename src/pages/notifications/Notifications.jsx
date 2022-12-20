import style from "./notifications.module.css";
import {setGlobalState} from "../../state/header";
import {useEffect} from "react";


const Notifications = () => {
    useEffect(() => {
        setGlobalState("headerTitle", "Notifications");
    });

    return (
        <div className={style.main}>
            Notifications
        </div>
    );
};

export default Notifications;