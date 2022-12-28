import React, {useEffect, useState} from 'react';
import style from "./app.module.css";
import Content from './Components/Content/Content';
import Header from './Components/Header/Header';
import SideBar from './Components/SideBar/SideBar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Auth from "./Components/Auth/Auth";

// import {useMutation, useQuery} from "@apollo/client";
// import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
// import {CREATE_USER} from "./mutations/user";

function App({client}) {
    const [calendar, setCalendar] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    if(localStorage.getItem("user") != null && isAuth == false){
        setIsAuth(true);
    }
    // const [users, setUsers] = useState("");
    // const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
    // const {data:oneUser, loading:loadingOneUser} = useQuery(GET_ONE_USER, {
    //     variables: {
    //         id: 1
    //     }
    // });
    // const [newUser] = useMutation(CREATE_USER);
    //
    // const [username, setUsername] = useState("");
    // const [age, setAge] = useState(0);
    //
    // useEffect( () => {
    //     if(!loading) {
    //         setUsers(data.getAllUsers);
    //     }
    //     console.log(oneUser);
    // }, [data, oneUser])
    //
    // const addUser = (e) => {
    //     e.preventDefault();
    //     newUser({
    //         variables: {
    //             input: {
    //                 username, age
    //             }
    //         }
    //     }).then (({data}) => {
    //         console.log(data);
    //         setUsername("");
    //         setAge(0);
    //     });
    // }
    //
    // const getAll = (e) => {
    //     e.preventDefault();
    //     refetch();
    // }
    //
    // if(loading) {
    //     return (<h1>Loading...</h1>);
    // }

    return (
        <BrowserRouter>
            <div id="app">
                {calendar}
                {
                    isAuth ?
                        <div className={style.main}>
                            <nav className={style.navigation}><SideBar setIsAuth={setIsAuth}/></nav>
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
