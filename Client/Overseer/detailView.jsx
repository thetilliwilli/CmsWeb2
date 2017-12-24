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
            <div>
                <div> <RaisedButton label="Назад" onClick={this.props.ResetDetailView} /> </div>
                <div> <DetailList list={this.props.data} /> </div>
            </div>
        );
    }
}