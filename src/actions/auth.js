import {
    REGISTER_SUCCESS,
    RESETPWD_SUCCESS,
    RESETPWD_FAIL,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const register =
    (firstname, lastname, email, password) => async (dispatch) => {
        try{
            let response = await AuthService.register(firstname, lastname, email, password);

            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        }catch(error){
            const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                dispatch({
                    type: REGISTER_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
        }        
    };

export const resetPassword = (email) => async (dispatch) => {
    try {
        let response = await AuthService.resetPassword(email);

        dispatch({
            type: RESETPWD_SUCCESS,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
        });

        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: RESETPWD_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    }
};

export const updatePassword = (token, user_id, password) => async (dispatch) => {
    try {
        let response = await AuthService.updatePassword(token, user_id, password);

        // dispatch({
        //     type: RESETPWD_SUCCESS,
        // });

        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
        });

        return Promise.resolve();
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();

        // dispatch({
        //     type: RESETPWD_FAIL,
        // });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    }
};

export const login = (email, password) => async (dispatch) => {
    try{
        let data = await AuthService.login(email, password);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
        });

        return Promise.resolve();

    }catch(error){
        const message =
        (error.response &&
            error.response.data &&
            error.response.data.message) ||
        error.message ||
        error.toString();

        dispatch({
            type: LOGIN_FAIL,
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
    }
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
