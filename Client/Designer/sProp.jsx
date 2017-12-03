"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from "material-ui/Divider";
import langService from "../Service/language.js";

import util from "../Module/util.js";
import EnumSelector from "../Component/enumSelector.jsx";

export default class SProp extends React.Component
{
    constructor(props){
        super(props);

        this.state = {data: props.propData};

        this.OnChange = this.OnChange.bind(this);
        this.OnEnumChange = this.OnEnumChange.bind(this);
    }

    OnChange(event, newValue){
        let newState = util.DeepCopy(this.state);

        if(this.props.lang==="ru")
            newState.data.ru = newValue;
        else
            newState.data.en = newValue;

        this.setState(newState);
    }

    //SUPER DIRTY HACK
    OnEnumChange(event, newValue){
        this.OnChange(event, newValue);

        //SUPER DIRTY HACK
        this.props.OnEnumChange && this.props.OnEnumChange(newValue);
    }

    render(){
        const propName = this.props.propName;
        // const hideLocationAndDateOfCreation = propName==="location"||propName==="date" ? "none" : "initial";
        const isMultiline = propName==="biography" || propName==="awards" || propName==="characteristics";
        const multilineStyleAddition = isMultiline ? {multiLine:true, rowsMax: 12 } : {};//Если это Поле с Историей или Описанием то сделать Multiline полем
        const ruFullfiledStyleAddition = isMultiline && this.state.data.ru.split(/\r*\n/).length > 1 ? {backgroundColor:"rgba(0,188,212,0.1)"} : {};//Добавляем выделение когда несколько абзацев присутствует
        const enFullfiledStyleAddition = isMultiline && this.state.data.en.split(/\r*\n/).length > 1 ? {backgroundColor:"rgba(0,188,212,0.1)"} : {};//Добавляем выделение когда несколько абзацев присутствует

        
        const langTags = langService.GetTagList();
        const multilangInput = langTags.map( (tag, index) => {
            const notMultiLang = this.props.propData.notMultiLang;
            const langTagFirstUpperCase = tag[0].toUpperCase()+tag.slice(1);

            const isVisible = notMultiLang === true
                ? tag === langService.default.tag
                : tag === this.props.lang;
            const display = isVisible ? "initial" : "none";

            let inputElement = null;
            switch(this.props.propData.type)
            {
                case "string":
                    inputElement = <TextField onChange={this.OnChange} name={tag + "."+propName} floatingLabelText={this.props.propData.label} value={this.state.data[tag]} fullWidth {...multilineStyleAddition} style={{...ruFullfiledStyleAddition}} />;
                    break;
                case "date":
                    let theDate = this.state.data[tag] && new Date(this.state.data[tag]) || null;
                    inputElement = <DatePicker onChange={this.OnChange} name={tag + "."+propName} floatingLabelText={this.props.propData.label} value={theDate} openToYearSelection/>;
                    break;
                case "enum":
                    inputElement = <EnumSelector value={this.state.data[tag]} label={this.props.propData.label} enum={this.props.bureauEnum} OnChange={this.OnEnumChange} />
                    break;
            }

            if(inputElement === null)
                throw new Error(`Invalid input type: -${this.props.propData.type}-`);

            return (
                <div key={tag} className={`SProp_${langTagFirstUpperCase}`} style={{display}}>
                    {inputElement}
                </div>
            );
        });

        return (
            <li className="SProp">
                {multilangInput}
            </li>
        );
    }
}