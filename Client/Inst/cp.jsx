"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
export default class ControlPanel extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="InstSelector_ControlPanel" style={{display:"flex", flexWrap:"wrap"}} >
                <TextField
                    value={this.props.filterValue}
                    onChange={this.props.OnChange}
                    onMouseUp={this.Reset}
                    floatingLabelText="Поиск устройства"
                    floatingLabelFixed={true}
                    fullWidth
                />
                <FlatButton
                    label="Обновить"
                    style={{color:"grey", margin:"0px auto 0px auto"}}
                    icon={<RefreshIcon />}
                    onClick={this.props.OnRefresh}
                />
            </div>
        );
    }
}