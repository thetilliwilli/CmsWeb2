"use strict";
import React from "react";
import {Link} from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import siteMap from "../Modules/siteMap.js";

function ClearCookieAndRefresh(){
    document.cookie = "login=; Max-Age=0";
    document.cookie = "password=; Max-Age=0";
    window.location.reload();
}

class AppHeader extends React.Component
{
    constructor(props){
        super(props);
    }

    

    render(){
        return (
                <AppBar
                    onLeftIconButtonTouchTap={this.props.NavbarOpen}
                    title={siteMap.GetPageById(this.props.pageIndex).label}
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
export default connect(S2P,D2P)(AppHeader);