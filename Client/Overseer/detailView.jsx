"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import DetailList from "./detailList.jsx";

export default class DetailView extends React.Component
{
    render(){
        return (
            <div style={{height:"100%", width:"100%", display:"flex", flexWrap:"wrap"}}>
                <div style={{width:"100%", height:"5%", display:"flex", flexWrap:"wrap"}}> <RaisedButton label="Назад" onClick={this.props.ResetDetailView} /> </div>
                <div style={{width:"100%", height:"95%", display:"flex", flexWrap:"wrap", padding:"2px 2px 2px 2px"}}> <DetailList list={this.props.data} /> </div>
            </div>
        );
    }
}