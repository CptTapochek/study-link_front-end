import style from "./sign-up.module.css";
import React, {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {SIGN_UP} from "../../mutations/user";


const SignUp = ({client, setIsAuth}) => {
    const [email, setEmail] = useState("");
    const [type, setType] = useState("STUDENT");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [user, setUser] = useState("");
    const [newUser] = useMutation(SIGN_UP);
    const navigate = useNavigate();


    const onChangeTextInput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "email": setEmail(value.trim()); break;
            case "password": setPassword(value.trim()); break;
            case "name": setName(value.trim()); break;
            case "surname": setSurname(value.trim()); break;
            case "type": setType(value); break;
            default: break;
        }
        setValidationMessage("");
    };

    const sendData = async (e) => {
        e.preventDefault();
        let message = {};

        /* Validation */
        if(email.length === 0 || password.length < 4) {
            message = "Please fill out this fields";
        }
        setValidationMessage(message);

        if(validationMessage.length === 0) {
            newUser({
                variables: {
                    input: {
                        name, surname, email, type, password
                    }
                }
            }).then (({data}) => {
                if(data.SignUp["error"] != null) {
                    setValidationMessage(data.SignUp["error"]);
                } else {
                    setUser(data.SignUp);
                    localStorage.setItem("user", user);
                    navigate("/dashboard");
                    setIsAuth(true);
                }
                console.log(data.SignUp);
            });
        }
    }
    return (
        <div className={style.main}>
            {
                validationMessage.length > 0 ?
                <div className={style.validationError}>
                    <div className={style.exclamation}>!</div>
                    <div>{validationMessage}</div>
                </div> : <div/>
            }
            <div className={style.loginBlock}>
                <div className={style.logo}><b>S</b>tudyLink</div>
                <form onSubmit={sendData}>
                    <div className={style.input}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            onChange={onChangeTextInput}
                            value={name}
                        />
                    </div>
                    <div className={style.input}>
                        <label htmlFor="surname">Surname</label>
                        <input
                            id="surname"
                            name="surname"
                            type="surname"
                            onChange={onChangeTextInput}
                            value={surname}
                        />
                    </div>
                    <div className={style.input}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={onChangeTextInput}
                            value={email}
                        />
                    </div>
                    <div className={style.input}>
                        <label htmlFor="type">Type</label>
                        <select id="type" name="type" onChange={onChangeTextInput} defaultValue="STUDENT">
                            <option value="STUDENT">STUDENT</option>
                            <option value="TEACHER">TEACHER</option>
                        </select>
                    </div>
                    <div className={style.input}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={onChangeTextInput}
                            value={password}
                        />
                    </div>
                    <div className={style.submit}>
                        <button type="submit" className={style.submitButton}>Sign Up</button>
                    </div>
                </form>
            </div>
            <div className={style.signUp}>
                Have an account?
                <NavLink to={"/login"} className={style.signUpButton}>Login</NavLink>
            </div>
        </div>
    );
}

export default SignUp;