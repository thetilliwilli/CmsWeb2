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

function ClearCookieAndRefresh(){
    document.cookie = "login=; Max-Age=0";
    document.cookie = "password=; Max-Age=0";
    window.location.reload();
}

export default class AppHeader extends React.Component
{
    constructor(props){
        super(props);
    }

    

    render(){
        return (
                <AppBar
                    title="ExhibitApp"
                    iconElementRight={this.props.logged ? <FlatButton label="Logout" onClick={ClearCookieAndRefresh}/> : null}
                />
        );
    }
};

AppHeader.defaultProps = {
    logged: true
};