"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

export default function ControlPanel(props){
    const buttonBar = props.isEditMode
        ? <div>
            <RaisedButton label="СОХРАНИТЬ ИЗМЕНЕНИЯ" style={{margin:"10px"}} onClick={props.handlers.OnSubmit}></RaisedButton>
        </div>
        : <div>
            <RaisedButton label="ЗАГРУЗИТЬ В БАЗУ" style={{margin:"10px"}} onClick={props.handlers.OnSubmit}></RaisedButton>
            <RaisedButton label="СОХРАНИТЬ КАК ШАБЛОН" style={{margin:"10px"}}/>
            <RaisedButton label="ОЧИСТИТЬ" style={{margin:"10px"}} onClick={props.handlers.OnClear}/>
        </div>;
    return (
        <div className="ControlPanel" style={{position:"relative"}}>{/* Здесь relative для того что бы нормально работал blockerUi*/}
            {buttonBar}
            {
                props.blockControl &&
                /* убираем доступность кнопок при любом запросе на сервер */
                <div className="blockerUi"
                    style={{position:"absolute", lef:"0", top:"0", width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.95)", zIndex:"2", color:"grey", fontSize:"1.75em"}}
                >
                Выполняется операция <CircularProgress size={30} thickness={3} />
                </div>
            }
        </div>
    );
}