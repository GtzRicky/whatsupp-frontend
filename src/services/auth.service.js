import axios from "axios";
const faker = require('faker');

const API_URL = "http://localhost:9000/api/v1/";


const register = async (firstname, lastname, email, password) => {
    let phone = faker.phone.phoneNumber('+52##########');
    try {
        let response = await axios.post(API_URL + 'users/', {
            firstname,
            lastname,
            email,
            password,
            phone
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const resetPassword = (email) => {
    return axios.post(API_URL + "forgot-password", {
        email,
    });
};

const updatePassword = (token, user_id, password) => {
    return axios.post(API_URL + "update-password", {
        token,
        user_id,
        password,
    });
};

const login = async (email, password) => {
    try {
        let response = await axios.post(API_URL + "auth/signin", {
            email,
            password,
        });

        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    resetPassword,
    updatePassword,
    login,
    logout,
};
