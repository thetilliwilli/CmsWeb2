"use strict";
import React from "react";
import {Route, Switch} from "react-router-dom";
//Pages import---------------------------------------------
import HomePage from "../Page/homePage.jsx";
// import SignupPage from "../Page/signupPage.jsx";
// import LoginPage from "../Page/loginPage.jsx";
import ExhibitCreatorPage from "../Page/exhibitCreatorPage.jsx";
import ExhibitOverviewPage from "../Page/exhibitOverviewPage.jsx";
import ExhibitMockupOverviewPage from "../Page/exhibitMockupOverviewPage.jsx";


export default function PageSelectorRouting(p){
    return (
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/ExhibitCreatorPage" component={ExhibitCreatorPage}></Route>
            <Route exact path="/ExhibitOverview" component={ExhibitOverviewPage}></Route>
            <Route exact path="/ExhibitMockupOverviewPage" component={ExhibitMockupOverviewPage}></Route>
        </Switch>
    );
};