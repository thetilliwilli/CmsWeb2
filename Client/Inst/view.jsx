"use strict";
import React from "react";
import TextField from 'material-ui/TextField';

import ComplexList from "./complexList.jsx";

export default class InstView extends React.Component
{
    render(){
        return (
            <div style={{height:"100%", width:"100%", display:"flex", flexWrap:"wrap"}} >
                <div style={{width:"100%"}} >
                    <TextField value={this.props.model.id} hintText="id" floatingLabelFixed fullWidth disabled />
                    <TextField value={this.props.model.hardname} hintText="hardname" floatingLabelFixed fullWidth disabled />
                    <TextField value={this.props.model.description} hintText="description" floatingLabelFixed fullWidth multiLine rowsMax={2} />
                    <TextField value={this.props.model.complex} hintText="complex" floatingLabelFixed fullWidth />
                </div>
                <div style={{width:"100%"}} >
                    <ComplexList complex={this.props.model.complex} />
                </div>
            </div>
        );
    }
}

InstView.defaultProps = {
    id:"",
    hardname:"",
    description:"",
    complex:"",
};