"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const blockerUi = p => (
    <div className="blockerUi" style={{position:"absolute", lef:"0", top:"0", width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.95)", zIndex:"2", color:"grey", fontSize:"1.75em"}} >
        Выполняется операция <CircularProgress size={30} thickness={3} />
    </div>
);

export default function ControlPanel(props){
    const buttonBar = props.isEditMode
        ? <div>
            <RaisedButton label="СОХРАНИТЬ" style={{margin:"10px"}} onClick={props.handlers.OnSubmitTupleUpdate}></RaisedButton>
            <RaisedButton label="СОХРАНИТЬ НОВЫЙ" style={{margin:"10px"}} onClick={props.handlers.OnSubmitNewTuple}></RaisedButton>
        </div>
        : <div>
            <RaisedButton label="ЗАГРУЗИТЬ В БАЗУ" style={{margin:"10px"}} onClick={props.handlers.OnSubmitNewTuple}></RaisedButton>
            {/* <RaisedButton label="СОХРАНИТЬ КАК ШАБЛОН" style={{margin:"10px"}}/> */}
            <RaisedButton label="ОЧИСТИТЬ" style={{margin:"10px"}} onClick={props.handlers.OnClear}/>
        </div>;
    return (
        <div className="ControlPanel">
            {/* Удалил до тех пор пока не будет работтоспособной заполнялки - чтобы случайно не поломали на продакшен базе данных ничего */}
            {props.blockControl ? blockerUi : buttonBar}
        </div>
    );
}