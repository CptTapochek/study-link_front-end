import React, {useState} from 'react';
import style from "./app.module.css";
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import {BrowserRouter} from 'react-router-dom';
import Auth from "./Components/Auth/Auth";


function App({client}) {
    const [calendar, setCalendar] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    if(localStorage.getItem("user") != null && isAuth == false){
        setIsAuth(true);
    }

    return (
        <BrowserRouter>
            <div id="app">
                {calendar}
                {
                    isAuth ?
                        <div className={style.main}>
                            <nav className={style.navigation}>
                                <SideBar setIsAuth={setIsAuth}/>
                            </nav>
                            <main className={style.mainAppBlock}>
                                <header className={style.header}>
                                    <Header calendar={calendar} setCalendar={setCalendar} />
                                </header>
                                <div className={style.content}>
                                    <Content />
                                </div>
                            </main>
                        </div> : <Auth client={client} setIsAuth={setIsAuth} />
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
