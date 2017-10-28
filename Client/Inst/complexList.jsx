"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

import InstView from "./view.jsx";
import util from "../Module/util.js";

class ComplexList extends React.Component
{

    render(){
        const il = this.props.appState[`${util.CurrentDomain()}Domain`].overview
            .filter(ex => ex.complex === this.props.complex )
            .map(ex =>
                <ListItem
                    key={ex.id}
                    primaryText={
                        <span>
                            <span style={{color:"lightgrey"}}>{`#${("0000" + ex.id).slice(-3)}`}</span>
                            <span>{ex.name}</span>
                        </span>
                    }
                />
            );
        return (
            <List style={{height:"100%", width:"100%"}} >
                {il.length ? il : "К этикетке не привязано ни одного экспоната"}
            </List>
        );
    }
}

import {connect} from "react-redux";
const S2P = state => ({
    appState: state
});
export default connect(S2P)(ComplexList);