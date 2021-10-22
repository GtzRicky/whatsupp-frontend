import React, {useEffect, useState} from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡Este campo es requerido!
            </div>
        );
    }
};


const ResetPasswordForm = ({
    successful,
    message,
    form,
    checkBtn,
    handleUpdatePassword,
    password,
    repeatPassword,
    onChangePassword,
    onChangeRepeatPassword,
}) => {

    const [validPwd, setValidPwd] = useState(false);

    useEffect(() => {
        if (password !== repeatPassword) {
            return setValidPwd(false);
        }
        return setValidPwd(true);
    }, [password, repeatPassword]);

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleUpdatePassword} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="password">Nueva Contraseña</label>
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
                                <label htmlFor="password">Confirma Contraseña</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="repeat_password"
                                    value={repeatPassword}
                                    onChange={onChangeRepeatPassword}
                                    validations={[required]}
                                />
                                {
                                    !validPwd && (
                                        <div>
                                            <div class="alert alert-danger" role="alert">Las contraseñas no coinciden.</div>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="form-group">
                
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={!validPwd}
                                >
                                    <span>Restablecer</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
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

export default ResetPasswordForm;
