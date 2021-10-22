import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatePassword } from "../../actions/auth";

import UpdatePassword from "../../components/UpdatePassword/UpdatePasswordForm";

const UpdatePasswordPage = ({location}) => {
    const params = new URLSearchParams(location.search);
    console.log(params.get('token'));
    console.log(params.get('user_id'));
    //1. Estados de password y repeatedPassword
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector((state) => state.message);

    const form = useRef();
    const checkBtn = useRef();

    const dispatch = useDispatch();

    //2. Manejadores para cambiar el estado de password y repeatedPassword
    //En base a lo que el usuario ingresa en el formulario

    const onChangePassword = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    };

    const onChangeRepeatPassword = (e) => {
        const passwordValue = e.target.value;
        setRepeatPassword(passwordValue);
    };

    //3. Función para lanzar (dispach) la acción de actualizar la contraseña del usuario
    //Basados en el token, user_id y password (newPassword)

    const handleUpdatePassword = async (e) => {
        let token = params.get('token');
        let user_id = params.get('user_id');
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            try {
                await dispatch(updatePassword(token, user_id, password));
                setSuccessful(true);
            } catch (error) {
                setSuccessful(false);
            }
        }
    };

    return (
        //4. Importar el formulario para cambiar la contraseña
        <UpdatePassword
            form={form}
            checkBtn={checkBtn}
            password={password}
            repeatPassword={repeatPassword}
            successful={successful}
            message={message}
            onChangePassword={onChangePassword}
            onChangeRepeatPassword={onChangeRepeatPassword}
            handleUpdatePassword={handleUpdatePassword}
        />
    );
};

export default UpdatePasswordPage;
