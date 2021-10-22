import React from "react";
import { history } from '../helpers/history';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  history.listen(() => {
    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  });

  if(user){
    return <div onClick={() => props.logOut()}>Cerrar Sesión</div>;
  }
  return <div></div>;
};

export default AuthVerify;
