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
                    title={"Page# " + siteMap.GetPageById(this.props.pageIndex).label}
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
function MapStateToProps(state){
    return {
        pageIndex: state.page
    };
};
export default connect(MapStateToProps)(AppHeader);