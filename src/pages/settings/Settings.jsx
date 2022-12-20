import style from "./settings.module.css";
import {setGlobalState} from "../../state/header";
import {useEffect} from "react";


const Settings = () => {
    useEffect(() => {
        setGlobalState("headerTitle", "Settings");
    });

    return (
        <div className={style.main}>
            Settings
        </div>
    );
};

export default Settings;