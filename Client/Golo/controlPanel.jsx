"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const BlockerUi = (props) =>
    <div className="blockerUi" style={{display:"flex", flexWrap:"wrap", width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.95)", zIndex:"2", color:"grey", fontSize:"1.75em"}} >
        Выполняется операция <CircularProgress size={30} thickness={3} style={{margin:"auto 0 auto 12px"}} />
    </div>

export default function ControlPanel(props){
    const buttonBar = props.isEditMode
        ? <div style={{padding:"4px 4px 4px 4px"}}>
            <RaisedButton label="СОХРАНИТЬ" style={{marginLeft:"10px"}} onClick={props.handlers.OnSubmitGoloUpdate}></RaisedButton>
            <RaisedButton label="СОЗДАТЬ НОВЫЙ" style={{marginLeft:"10px"}} onClick={props.handlers.OnSubmitNewGolo}></RaisedButton>
            <RaisedButton label="ВОССТАНОВИТЬ ШАБЛОН" style={{marginLeft:"10px"}} onClick={props.handlers.ResetEditData}></RaisedButton>
            <span style={{color:"lightgrey", marginLeft:"10px"}} >{props.templateName}</span>
        </div>
        : <div style={{padding:"4px 4px 4px 4px"}}>
            <RaisedButton label="ЗАГРУЗИТЬ В БАЗУ" style={{marginLeft:"10px"}} onClick={props.handlers.OnSubmitNewGolo}></RaisedButton>
            <RaisedButton label="ОЧИСТИТЬ" style={{marginLeft:"10px"}} onClick={props.handlers.OnClear}/>
        </div>;
    return (
        <div className="ControlPanel">
            {props.blockControl ? <BlockerUi /> : buttonBar}
        </div>
    );
}