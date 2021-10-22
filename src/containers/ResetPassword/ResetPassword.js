import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ResetPasswordForm from "../../components/ResetPassword/ResetPasswordForm";

import { resetPassword } from "../../actions/auth";

const ResetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);

    const form = useRef();
    const checkBtn = useRef();

    const dispatch = useDispatch();


    const onChangeEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
    };

    const handleResetPassword = async(e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            try{
                await dispatch(resetPassword(email))
                setSuccessful(true);
            }catch(error){
                setSuccessful(false);
            }
        }
    };

    return (
        <ResetPasswordForm
            form={form}
            checkBtn={checkBtn}
            email={email}
            successful={successful}
            setEmail={setEmail}
            message={message}
            onChangeEmail={onChangeEmail}
            handleResetPassword={handleResetPassword}
        />
    );
};

export default ResetPasswordPage;
