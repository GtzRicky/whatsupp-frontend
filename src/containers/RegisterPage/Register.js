import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import RegisterForm from "../../components/Register/RegisterForm";

import { isEmail } from "validator";

import { register } from "../../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Este campo es requerido.
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Ingresa un email valido.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 8 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                La contraseña debe contener entre 8 y 40 caracteres.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    const onChangeFirstname = (e) => {
        const firstname = e.target.value;
        setFirstname(firstname);
    };

    const onChangeLastname = (e) => {
        const lastname = e.target.value;
        setLastname(lastname);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = async(e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            try{
                await dispatch(register(firstname, lastname, email, password));
                setSuccessful(true);
            }catch(error){
                setSuccessful(false);
            }
        }
    };

    const handlers = {
        onChangeFirstname,
        onChangeLastname,
        onChangeEmail,
        onChangePassword,
        handleRegister,
    };

    const validators = {
        validEmail,
        vpassword,
        required,
    };

    return (
        <RegisterForm
            form={form}
            checkBtn={checkBtn}
            firstname={firstname}
            lastname={lastname}
            email={email}
            password={password}
            successful={successful}
            message={message}
            handlers={handlers}
            validators={validators}
        />
    );
};

export default Register;
