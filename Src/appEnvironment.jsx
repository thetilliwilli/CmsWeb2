import React from "react";
import TapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {BrowserRouter as Router} from "react-router-dom";

TapEventPlugin();

export default function AppEnvironment(props){
    return (
        <div className="AppEnvironment">
            <MuiThemeProvider>
                <Router>
                {props.children}

                </Router>
            </MuiThemeProvider>
        </div>
    );
};