import React from "react";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import style from "./app.module.css";


function App() {
    //const navigate = useNavigate();

    return (
        <div id="app">
            <div className={style.main}>
                <div className={style.header}></div>
                <div className={style.navigation}></div>
                <div className={style.content}></div>
            </div>
            {/*<Routes>*/}
            {/*  /!*<Route path="/*" element={<courses/>} />*!/*/}
            {/*</Routes>*/}
        </div>
    );
}

export default App;
