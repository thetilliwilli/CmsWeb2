import React from "react";
import TapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store.js";

TapEventPlugin();

export default function AppEnvironment(props){
    return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <Router>
                        {props.children}
                    </Router>
                </Provider>
            </MuiThemeProvider>
    );
};