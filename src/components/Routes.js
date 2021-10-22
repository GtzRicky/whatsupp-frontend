import React from "react";
import { Switch, Route } from "react-router-dom";

const Routes = ({routes}) => {
    return (
        <div>
            <Switch>
                <Route exact path={["/", "/home"]} component={routes.Home} />
                <Route exact path="/login" component={routes.Login} />
                <Route exact path="/register" component={routes.Register} />
                <Route exact path="/reset-password" component={routes.ResetPassword} />
                <Route exact path="/update-password" component={routes.UpdatePassword} />
                <Route exact path="/profile" component={routes.Profile} />
                <Route exact path="/chat" component={routes.ChatBox} />
                <Route path="/user" component={routes.BoardUser} />
                <Route path="/mod" component={routes.BoardModerator} />
                <Route path="/admin" component={routes.BoardAdmin} />
            </Switch>
        </div>
    );
};

export default Routes;