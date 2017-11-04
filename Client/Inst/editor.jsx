"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import InstView from "./view.jsx";

const CP = (props) => {
    return (
        <div style={{width:"100%"}} >
            <RaisedButton label="Сохранить" onClick={props.OnSave} fullWidth/>
            {/* <RaisedButton label="Удалить" onClick={props.OnDelete} fullWidth/> */}
        </div>
    );
};

export default class InstEditor extends React.Component
{
    constructor(props){
        super(props);

        this.OnSave = this.OnSave.bind(this);
        this.OnDelete = this.OnDelete.bind(this);
    }

    OnSave(){
        this.props.SubmitUpdate(this.props.data);
    }
    
    OnDelete(){
        this.props.SubmitDelete(this.props.data.id);
    }

    render(){
        return (
            <div style={{width:"100%", display:"flex", flexWrap:"wrap", boxShadow:"0px 0px 17px 1px rgba(128,128,192,0.4)"}} >
                <div style={{height:"10%", width:"100%"}} >
                    <CP OnSave={this.OnSave} OnDelete={this.OnDelete}/>
                </div>
                <div style={{width:"100%"}}>
                    <InstView InstChange={this.props.InstChange} EditEntity={this.props.EditEntity} data={this.props.data} />
                </div>
            </div>
        );
    }
}