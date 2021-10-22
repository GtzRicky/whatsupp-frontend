import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./components/Routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./containers/LoginPage/Login";
import Register from "./containers/RegisterPage/Register";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import UpdatePassword from "./containers/UpdatePassword/UpdatePassword";
import ChatBox from "./containers/ChatBox/ChatContainer";

import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    console.log(currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            // setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.user.roles.includes("ROLE_ADMIN"));
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    const routes = {
        Home,
        Login,
        Register,
        ResetPassword,
        UpdatePassword,
        Profile,
        ChatBox,
        BoardUser,
        BoardModerator,
        BoardAdmin
    };

    return (
        <Router history={history}>
            <div>
                <Navbar
                    showModeratorBoard={showModeratorBoard}
                    showAdminBoard={showAdminBoard}
                    logOut={logOut}
                />

                <Routes routes={routes} />

                <AuthVerify logOut={logOut}/>
            </div>
        </Router>
    );
};

export default App;
