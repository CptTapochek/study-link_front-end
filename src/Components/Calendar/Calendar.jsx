import style from './calendar.module.css';

const Calendar = ({setCalendar}) => {

    const dismissCalendar = () => {
        setCalendar("");
    };

    return (
        <div className={style.main}>
            <div className={style.darkBG} onClick={dismissCalendar}/>
            <div className={style.box}>
                Calendar
            </div>
        </div>
    );
};

export default Calendar;