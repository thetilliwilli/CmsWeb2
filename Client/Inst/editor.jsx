"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

import InstView from "./view.jsx";

const CP = (props) => {
    return (
        <div>
            <RaisedButton label="Сохранить" onClick={()=>{alert("Сохранено")}} />
            <RaisedButton label="Удалить" onClick={()=>{alert("Удалено")}} />
        </div>
    );
};

export default class InstEditor extends React.Component
{
    render(){
        return (
            <div style={{height:"100%", width:"100%", display:"flex", flexWrap:"wrap"}} >
                <div style={{height:"10%", width:"100%"}} >
                    <CP />
                </div>
                <div style={{width:"100%"}}>
                    <InstView data={this.props.data} />
                </div>
            </div>
        );
    }
}