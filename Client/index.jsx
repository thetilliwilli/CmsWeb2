"use strict";
/**
 * 
 * Application loader. Assemble App with AppEnviroment and mount it to Root DOM element in HTML
 * 
 */

import React from "react";
import ReactDOM from "react-dom";

import AppEnvironment from "./App/appEnvironment.jsx";
import App from "./App/app.jsx";

function CompiledApp(props){
    return (
        <AppEnvironment>
            <App />
        </AppEnvironment>
    );
}

window.addEventListener("load", ()=>{
    ReactDOM.render(<CompiledApp />, document.getElementById("app"));
});