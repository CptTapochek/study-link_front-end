import React, {useState} from 'react';
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import style from "./app.module.css";
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import {BrowserRouter} from 'react-router-dom';


function App() {
    const [calendar, setCalendar] = useState("");

    return (
        <BrowserRouter>
            <div id="app">
                {calendar}
                <div className={style.main}>
                    <nav className={style.navigation}><SideBar/></nav>
                    <main className={style.mainAppBlock}>
                        <header className={style.header}>
                            <Header calendar={calendar} setCalendar={setCalendar}/>
                        </header>
                        <div className={style.content}>
                            <Content/>
                        </div>
                    </main>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
