"use strict";
import React from "react";
import TextField from 'material-ui/TextField';

import ComplexList from "./complexList.jsx";

export default class InstView extends React.Component
{
    constructor(props){
        super(props);

        this.form = null;

        this.OnChange = this.OnChange.bind(this);
    }

    OnChange(event, newValue){
        if(this.form !== null)
        {
            const formData = {};
            for(let el of this.form.elements)
                formData[el.name] = el.value;
            console.log(JSON.stringify(formData));
            this.props.InstChange(formData);
        }
    }

    render(){
        return (
            <div style={{width:"100%", display:"flex", flexWrap:"wrap"}} >
                <form ref={el=>this.form=el} style={{width:"100%"}} >
                    <TextField name="id" onChange={this.OnChange} value={this.props.data.id || ""} floatingLabelText="id"  fullWidth disabled />
                    <TextField name="hardname" onChange={this.OnChange} value={this.props.data.hardname || ""} floatingLabelText="hardname"  fullWidth disabled />
                    <TextField name="description" onChange={this.OnChange} value={this.props.data.description || ""} floatingLabelText="description"  fullWidth multiLine rowsMax={2} />
                    <TextField name="complex" onChange={this.OnChange} value={this.props.data.complex || ""} floatingLabelText="complex"  fullWidth />
                </form>
                <div style={{width:"100%"}} >
                    <ComplexList EditEntity={this.props.EditEntity} complex={this.props.data.complex} />
                </div>
            </div>
        );
    }
}