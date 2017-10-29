"use strict";
import React from "react";
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

export default class ControlPanel extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="GoloOverview_ControlPanel" style={{display:"flex", flexWrap:"wrap"}} >
                <div style={{width:"10%", display:"flex", flexWrap:"wrap"}} >
                    <RaisedButton style={{ margin:"auto auto 10px auto"}} icon={<RefreshIcon />} onClick={this.props.OnRefresh}/>
                </div>
                <div style={{width:"90%"}} >
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