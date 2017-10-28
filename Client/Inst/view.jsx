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
                    <TextField value={this.props.data.id} hintText="id" floatingLabelFixed fullWidth disabled />
                    <TextField value={this.props.data.hardname} hintText="hardname" floatingLabelFixed fullWidth disabled />
                    <TextField value={this.props.data.description} hintText="description" floatingLabelFixed fullWidth multiLine rowsMax={2} />
                    <TextField value={this.props.data.complex} hintText="complex" floatingLabelFixed fullWidth />
                </div>
                <div style={{width:"100%"}} >
                    <ComplexList complex={this.props.data.complex} />
                </div>
            </div>
        );
    }
}