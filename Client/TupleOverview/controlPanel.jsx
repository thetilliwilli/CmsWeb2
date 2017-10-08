"use strict";
import React from "react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class ControlPanel extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="TupleOverview_ControlPanel">
                <TextField 
                    value={this.props.filterValue} onChange={this.props.OnChange}
                    floatingLabelText="Поиск по имени экспоната" floatingLabelFixed={true}
                />
                <br/>
                <RaisedButton label="Обновить список" onClick={this.props.OnRefresh}/>
            </div>
        );
    }
}