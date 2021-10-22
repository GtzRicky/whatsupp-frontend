import React from "react";

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

const ResetPasswordForm = ({
    loading,
    successful,
    message,
    form,
    checkBtn,
    handleResetPassword,
    email,
    onChangeEmail,
}) => {
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleResetPassword} ref={form}>
                    {!successful && (
                        <div>
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
                                {loading && (
                                    <div
                                        className={styles["container-loading"]}
                                    >
                                        <div className="spinner-border spinner-border-sm"></div>
                                    </div>
                                )}
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={loading}
                                >
                                    <span>Envíar</span>
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
