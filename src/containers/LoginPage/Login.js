import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/Login/LoginForm";

import { login } from "../../actions/auth";

const Login = ({ history }) => {
    const form = useRef();
    const checkBtn = useRef();

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleLogin = async(e, email, password) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            try{
                await dispatch(login(email, password));
                history.push("/profile");
                window.location.reload();
            }catch(error){
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    }

    return (
        <LoginForm
            form={form}
            checkBtn={checkBtn}
            loading={loading}
            handleLogin={handleLogin}
        />
    );
};

export default Login;
