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
        ? <div>
            <RaisedButton label="СОХРАНИТЬ" style={{margin:"10px"}} onClick={props.handlers.OnSubmitExhibitUpdate}></RaisedButton>
            <RaisedButton label="СОЗДАТЬ НОВЫЙ" style={{margin:"10px"}} onClick={props.handlers.OnSubmitNewExhibit}></RaisedButton>
            <RaisedButton label="ВОССТАНОВИТЬ ШАБЛОН" style={{margin:"10px"}} onClick={props.handlers.ResetEditData}></RaisedButton>
            <span style={{color:"lightgrey"}} >{props.templateName}</span>
        </div>
        : <div>
            <RaisedButton label="ЗАГРУЗИТЬ В БАЗУ" style={{margin:"10px"}} onClick={props.handlers.OnSubmitNewExhibit}></RaisedButton>
            {/* <RaisedButton label="СОХРАНИТЬ КАК ШАБЛОН" style={{margin:"10px"}}/> */}
            <RaisedButton label="ОЧИСТИТЬ" style={{margin:"10px"}} onClick={props.handlers.OnClear}/>
        </div>;
    return (
        <div className="ControlPanel">
            {props.blockControl ? <BlockerUi /> : buttonBar}
        </div>
    );
}