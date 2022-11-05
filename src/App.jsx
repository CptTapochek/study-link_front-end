import React, {useState} from 'react';
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import style from "./app.module.css";
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';


function App() {
    const [calendar, setCalendar] = useState("");

    return (
        <div id="app">
            {calendar}
            <div className={style.main}>
                <nav className={style.navigation}></nav>
                <main className={style.mainAppBlock}>
                    <header className={style.header}>
                        <Header calendar={calendar} setCalendar={setCalendar}/>
                    </header>
                    <div className={style.content}>
                        <Content/>
                    </div>
                </main>
            </div>
            {/*<Routes>*/}
            {/*  /!*<Route path="/*" element={<courses/>} />*!/*/}
            {/*</Routes>*/}
        </div>
    );
}

export default App;
