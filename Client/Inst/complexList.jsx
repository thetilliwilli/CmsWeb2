"use strict";
import React from "react";
import {List, ListItem} from 'material-ui/List';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';

import util from "../Module/util.js";
import Ordinaler from "./ordinaler.jsx";

const quantity = 10;
var menuItems = new Array(quantity)
for(var i=0;i<menuItems.length;++i)
    menuItems[i]=i;
menuItems = menuItems.map(i => <MenuItem key={i} value={i} primaryText={i}></MenuItem>);

class ComplexList extends React.Component
{
    constructor(props){
        super(props);

        this.state = {open:false, anchorEl:null};

        this.OnRequestClose = this.OnRequestClose.bind(this);
        this.OnAnyClick = this.OnAnyClick.bind(this);
    }

    OnRequestClose(){
        this.setState({open:false});
    }

    OnAnyClick(event, entityId){
        if(event.button === 0)
        {
            this.props.EditEntity(entityId);
        }
        else
        {
            event.preventDefault();
            
            this.setState({
                open: true,
                anchorEl: event.currentTarget,
            });
        }
        
    }

    render(){
        const il = this.props.appState[`${util.CurrentDomain()}Domain`].overview
            .filter(ex => ex.complex
                ? ex.complex === this.props.complex
                : false
            )
            .map(ex =>
                <ListItem key={ex.id} onMouseDown={e=>this.OnAnyClick(e, ex.id)}>
                    <span>
                        <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span>
                        <span>{"\u00a0\u00a0"}{ex.name}</span>
                        <span>{ex.ordinal}</span>
                        {/* <IconMenu
                        iconButtonElement={<IconButton>{ex.ordinal}</IconButton>}
                        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >{menuItems}</IconMenu> */}
                    </span>
                </ListItem>
            );
        return (
                <List>
                    {il.length ? il : <span style={{color:"Chocolate "}}>К этикетке не привязано ни одного экспоната</span>}
                </List>
            // <div style={{height:"100%", width:"100%"}}>
            //     <Ordinaler open={this.state.open} anchorEl={this.state.anchorEl} OnRequestClose={this.OnRequestClose}/>
            // </div>
        );
    }
}

import {connect} from "react-redux";
const S2P = state => ({
    appState: state
});
export default connect(S2P)(ComplexList);