import React from "react";
import ReactDOM from "react-dom";

import AppEnvironment from "./appEnvironment.jsx";
import App from "./app.jsx";

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