"use strict";
import React from "react";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

const quantity = 10;
var menuItems = new Array(quantity)
for(var i=0;i<menuItems.length;++i)
    menuItems[i]=i;
menuItems = menuItems.map(i => <MenuItem key={i} value={i} primaryText={i}></MenuItem>);

export default class Ordinaler extends React.Component
{

    render(){
        return (
            <Popover
                open={this.props.open}
                anchorEl={this.props.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.props.OnRequestClose}
            >
                {menuItems}
            </Popover>
        );
    }
}