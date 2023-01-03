import {Route, Routes} from "react-router-dom";
import Login from "../../pages/login/Login";
import SignUp from "../../pages/sign-up/SignUp";


const Auth = ({setIsAuth, client}) => {
    return (
        <Routes>
            <Route path={"/*"} element={<Login client={client} setIsAuth={setIsAuth}/>}/>
            <Route path={"/sign-up"} element={<SignUp setIsAuth={setIsAuth}/>}/>
        </Routes>
    );
};

export default Auth;