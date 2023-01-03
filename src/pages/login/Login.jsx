import style from "./login.module.css";
import React, {useEffect, useState} from "react";
import {LOGIN} from "../../query/user";
import {NavLink, useNavigate} from "react-router-dom";


const Login = ({client, setIsAuth}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const navigate = useNavigate();


    const onChangeTextInput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                setEmail(value.trim());
                break;
            case "password":
                setPassword(value.trim());
                break;
            default:
                break;
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
            const { data } = await client.query({
                query: LOGIN,
                variables: {
                    email: email,
                    password: password
                }
            });
            if(data.login["error"] != null) {
                setValidationMessage(data.login["error"]);
            } else {
                let loginUser = {
                    _id: data.login["_id"],
                    email: data.login["email"],
                    name: data.login["name"],
                    surname: data.login["surname"],
                    type: data.login["type"]
                }
                await localStorage.setItem("user", JSON.stringify(loginUser));
                navigate("/dashboard");
                setIsAuth(true);
            }
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
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={onChangeTextInput}
                        />
                    </div>
                    <div className={style.input}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={onChangeTextInput}
                        />
                    </div>
                    <div className={style.submit}>
                        <button type="submit" className={style.submitButton}>Login</button>
                    </div>
                </form>
            </div>
            <div className={style.signUp}>
              Don't have an account?
              <NavLink to={"/sign-up"} className={style.signUpButton}>Sign Up</NavLink>
            </div>
        </div>
    );
}

export default Login;