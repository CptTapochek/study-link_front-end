import style from "./settings.module.css";
import {setGlobalState} from "../../state/header";


const Settings = () => {
    setGlobalState("headerTitle", "Settings");

    return (
        <div className={style.main}>
            Settings
        </div>
    );
};

export default Settings;