"use strict";
import React from "react";
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
            <div className="InstSelector_ControlPanel" style={{display:"flex", flexWrap:"wrap", width:"100%"}} >
                <div style={{width:"20%", display:"flex", flexWrap:"wrap"}} >
                    <RaisedButton style={{ margin:"auto auto 10px auto"}} icon={<RefreshIcon />} onClick={this.props.OnRefresh}/>
                </div>
                <div style={{width:"80%"}} >
                    <TextField 
                        value={this.props.filterValue} onChange={this.props.OnChange}
                        floatingLabelText="Поиск приложения" floatingLabelFixed={true}
                        fullWidth
                    />
                </div>
            </div>
        );
    }
}