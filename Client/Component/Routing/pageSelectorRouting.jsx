"use strict";
import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
//Pages import---------------------------------------------
// import HomePage from "../Page/homePage.jsx";
// import SignupPage from "../Page/signupPage.jsx";
// import LoginPage from "../Page/loginPage.jsx";
import ExhibitCreatorPage from "../Page/exhibitCreatorPage.jsx";
import ExhibitOverviewPage from "../Page/exhibitOverviewPage.jsx";
import MockupCreatePage from "../Page/mockupCreatePage.jsx";
import MockupOverviewPage from "../Page/mockupOverviewPage.jsx";


export default function PageSelectorRouting(props){
    return (
        <Switch>
            <Route exact path="/" render={p=><Redirect to="/ExhibitCreatorPage" />} />
            <Route exact path="/ExhibitCreatorPage" component={ExhibitCreatorPage} />
            <Route exact path="/ExhibitOverview" component={ExhibitOverviewPage}></Route>
            <Route exact path="/MockupCreatePage" component={MockupCreatePage}></Route>
            <Route exact path="/ExhibitMockupOverviewPage" component={MockupOverviewPage}></Route>
        </Switch>
    );
};