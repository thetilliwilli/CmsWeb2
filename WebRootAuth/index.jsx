"use strict";
import React from "react";
import ReactDOM from "react-dom";
import TapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {BrowserRouter as Router} from "react-router-dom";

import LoginPage from "./loginPage.jsx";

TapEventPlugin();

function App(props){
    return (
        <div className="App">
            <MuiThemeProvider>
                <Router>
                    <LoginPage />
                </Router>
            </MuiThemeProvider>
        </div>
    );
};

window.addEventListener("load", ()=>{
    ReactDOM.render(<App />, document.getElementById("app"));
});