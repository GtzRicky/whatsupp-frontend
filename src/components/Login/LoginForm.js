import React, { useState } from "react";
import { useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from "./styles.module.css";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡Este campo es requerido!
            </div>
        );
    }
};

const LoginForm = ({loading, form, checkBtn, handleLogin }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { message } = useSelector((state) => state.message);

    const onChangeEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={(e) => handleLogin(e, email, password)} ref={form}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        {loading && (
                            <div className={styles["container-loading"]}>
                                <div className="spinner-border spinner-border-sm"></div>
                            </div>
                        )}
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            <span>Iniciar Sesión</span>
                        </button>
                        <div className="mt-4 float-left">
                            <a href="/reset-password" class="link-primary">¿Olvidaste la contraseña?</a>
                        </div>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
