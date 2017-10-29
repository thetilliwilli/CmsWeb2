"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class ControlPanel extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ExhibitOverview_ControlPanel" style={{display:"flex", flexWrap:"wrap"}} >
                <div style={{width:"20%", display:"flex", flexWrap:"wrap"}} >
                    <RaisedButton style={{ margin:"auto auto 10px auto"}} label="Обновить экспонаты" onClick={this.props.OnRefresh}/>
                </div>
                <div style={{width:"80%"}} >
                    <TextField 
                        value={this.props.filterValue} onChange={this.props.OnChange}
                        floatingLabelText="Поиск экспоната" floatingLabelFixed={true}
                        fullWidth
                    />
                </div>
            </div>
        );
    }
}