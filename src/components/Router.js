import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ( {isLoggedIn} ) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? <Home /> : <Auth />}
            </Switch>
        </Router>
    );
};

export default AppRouter;