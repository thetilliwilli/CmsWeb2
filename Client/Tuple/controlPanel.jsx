"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import util from "../Module/util.js";

const BlockerUi = (props) =>
    <div className="blockerUi" style={{display:"flex", flexWrap:"wrap", width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.95)", zIndex:"2", color:"grey", fontSize:"1.75em"}} >
        Выполняется операция <CircularProgress size={30} thickness={3} style={{margin:"auto 0 auto 12px"}} />
    </div>

export default function ControlPanel(props){
    const containerStyle = util.IfLandscape({padding:"4px 4px 4px 4px"}, {display:"flex", flexDirection:"column"});
    const buttonStyle = util.IfLandscape({marginLeft:"10px"}, {margin:"4px auto 4px auto", width:"80%"});
    const buttonBar = props.isEditMode
        ? <div style={containerStyle}>
            <RaisedButton label="СОХРАНИТЬ" style={buttonStyle} onClick={props.handlers.OnSubmitTupleUpdate}></RaisedButton>
            <RaisedButton label="СОЗДАТЬ НОВЫЙ" style={buttonStyle} onClick={props.handlers.OnSubmitNewTuple}></RaisedButton>
            <RaisedButton secondary style={buttonStyle} label="ВОССТАНОВИТЬ ШАБЛОН" onClick={props.handlers.ResetEditData}></RaisedButton>
            <span style={{color:"lightgrey", textAlign:"center", ...buttonStyle}} >{props.templateIndex} - {props.templateName}</span>
        </div>
        : <div style={containerStyle}>
            <RaisedButton label="ЗАГРУЗИТЬ В БАЗУ" style={buttonStyle} onClick={props.handlers.OnSubmitNewTuple}></RaisedButton>
            <RaisedButton label="ОЧИСТИТЬ" style={buttonStyle} onClick={props.handlers.OnClear}/>
        </div>;
    return (
        <div className="ControlPanel">
            {props.blockControl ? <BlockerUi /> : buttonBar}
        </div>
    );
}