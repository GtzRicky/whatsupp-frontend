import React from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const RegisterForm = ({handlers, form, successful, message, validators, firstname, lastname, email, password, checkBtn}) => {
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handlers.handleRegister} ref={form}>
                    {!successful && (
                        <div>

                            <div className="form-group">
                                <label htmlFor="username">Nombre</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    value={firstname}
                                    onChange={handlers.onChangeFirstname}
                                    validations={[validators.required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Apellidos</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={lastname}
                                    onChange={handlers.onChangeLastname}
                                    validations={[validators.required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={handlers.onChangeEmail}
                                    validations={[validators.required, validators.validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={handlers.onChangePassword}
                                    validations={[validators.required, validators.vpassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">
                                    Registrarme
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

export default RegisterForm;