"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
export default class ControlPanel extends React.Component
{
    constructor(props){
        super(props);
    
        this.Reset = this.Reset.bind(this);
    }

    //Обнулить значения фильтра при щелчке средней кнопкой мыши
    Reset(event){
        if(event.button===1)
            this.props.OnChange(event, "");
    }

    render(){
        return (
            <div className="BureauOverview_ControlPanel" style={{display:"flex", flexWrap:"wrap"}} >
                <div style={{width:"10%", display:"flex", flexWrap:"wrap"}} >
                    <RaisedButton style={{ margin:"auto auto 10px auto"}} icon={<RefreshIcon />} onClick={this.props.OnRefresh}/>
                </div>
                <div style={{width:"90%"}} >
                    <TextField 
                        value={this.props.filterValue}
                        onChange={this.props.OnChange}
                        onMouseUp={this.Reset}
                        floatingLabelText="Поиск экспоната" floatingLabelFixed={true}
                        fullWidth
                    />
                </div>
            </div>
        );
    }
}