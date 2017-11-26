"use strict";
import React from "react";
import {Link, withRouter} from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import util from "../Module/util.js";

import siteMap from "../Module/siteMap.js";

function ClearCookieAndRefresh(){
    document.cookie = "login=; Max-Age=0";
    document.cookie = "password=; Max-Age=0";
    window.location.reload();
}

const APP_TITLES = {
    tag: "Электронные этикетки",
    tuple: "Энциклопедия оружия",
    golo: "Сенсорные этикетки",
};

class AppHeader extends React.Component
{
    constructor(props){
        super(props);
    }

    

    render(){
        const title = APP_TITLES[util.CurrentDomain()];//Получаем название текущей админки из текущего Урла страницы
        return (
                <AppBar
                    onLeftIconButtonTouchTap={this.props.NavbarOpen}
                    title={title}
                    iconElementRight={this.props.logged ? <FlatButton label="Logout" onClick={ClearCookieAndRefresh}/> : null}
                />
        );
    }
};

AppHeader.defaultProps = {
    logged: true
};

//CONTAINER-------------------------------------------------------------------------------------------------
import {connect} from "react-redux";
import * as ac from "../App/ac.js";
function S2P(state){
    return {
        pageIndex: state.tagDomain.page
    };
};
const D2P = dsp => ({
    NavbarOpen: () => dsp(ac.NavbarOpen()),
});
export default withRouter(connect(S2P,D2P)(AppHeader));