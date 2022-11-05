import style from './header.module.css';
import Calendar from '../Calendar/Calendar';


const Header = ({calendar, setCalendar}) => {
    const openCalendar = () => {
        setCalendar(<Calendar setCalendar={setCalendar}/>);
    };

    return (
        <div className={style.header}>
            <div className={style.navigation}></div>
            <div className={style.date} onClick={openCalendar}>
                <div className={style.calendarIcon}/>
                <div className={style.calendarTitle}>
                    30 Oct, 2022
                </div>
            </div>
        </div>
    );
};

export default Header;