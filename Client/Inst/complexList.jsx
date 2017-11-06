"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';

import InstView from "./view.jsx";
import util from "../Module/util.js";

const quantity = 16;
var menuItems = new Array(quantity)
for(var i=0;i<menuItems.length;++i)menuItems[i]=i;
menuItems = menuItems.map(i => <MenuItem key={i} value={i} primaryText={i}></MenuItem>);

class ComplexList extends React.Component
{
    
    render(){
        const il = this.props.appState[`${util.CurrentDomain()}Domain`].overview
            .filter(ex => ex.complex
                ? ex.complex === this.props.complex
                : false
            )
            .map(ex =>
                <ListItem key={ex.id} onClick={()=>this.props.EditEntity(ex.id)}>
                    <span>
                        <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span>
                        <span>{"\u00a0\u00a0"}{ex.name}</span>
                    </span>
                </ListItem>
            );
        return (
            <List style={{height:"100%", width:"100%"}} >
                {il.length ? il : <span style={{color:"Chocolate "}}>К этикетке не привязано ни одного экспоната</span>}
            </List>
        );
    }
}

import {connect} from "react-redux";
const S2P = state => ({
    appState: state
});
export default connect(S2P)(ComplexList);