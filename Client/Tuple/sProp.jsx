"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from "material-ui/Divider";
import langService from "../Service/language.js";
import CatsubSelector from "./catsubSelector.jsx";
import CountrySelector from "./countrySelector.jsx";

import util from "../Modules/util.js";

export default class SProp extends React.Component
{
    constructor(props){
        super(props);

        this.state = {data: props.propData};

        this.OnChange = this.OnChange.bind(this);
    }

    OnChange(event, newValue){
        let newState = util.DeepCopy(this.state);

        // if(this.props.lang==="ru")
        //     newState.data.ru = newValue;
        // else
        //     newState.data.en = newValue;
        newState.data[this.props.lang] = newValue;

        this.setState(newState);
    }

    render(){
        // const displayRu = this.props.propData.notMultiLang === true
        //     ? "initial"
        //     : (this.props.lang === "ru" ? "initial":"none");
        // const displayEn = this.props.propData.notMultiLang === true
        //     ? "none"
        //     : (this.props.lang === "en" ? "initial":"none");

        // const ruDate = this.state.data.ru && new Date(this.state.data.ru) || null;
        // const enDate = this.state.data.en && new Date(this.state.data.en) || null;

        const propName = this.props.propName;
        // const hideLocationAndDateOfCreation = propName==="location"||propName==="date" ? "none" : "initial";
        const isMultiline = propName==="history" || propName==="description";
        const multilineStyleAddition = isMultiline ? {multiLine:true, rowsMax: 12 } : {};//Если это Поле с Историей или Описанием то сделать Multiline полем
        const ruFullfiledStyleAddition = isMultiline && this.state.data.ru.split(/\r*\n/).length > 1 ? {backgroundColor:"rgba(0,188,212,0.1)"} : {};//Добавляем выделение когда несколько абзацев присутствует
        const enFullfiledStyleAddition = isMultiline && this.state.data.en.split(/\r*\n/).length > 1 ? {backgroundColor:"rgba(0,188,212,0.1)"} : {};//Добавляем выделение когда несколько абзацев присутствует

        
        const langTags = langService.GetTagList();
        const multilangInput = langTags.map( (tag, index) => {
            const notMultiLang = this.props.propData.notMultiLang;
            const langTagFirstUpperCase = tag[0].toUpperCase()+tag.slice(1);

            // const isContextLanguage = this.props.lang === tag;
            // const isDefaultLanguage = tag === langService.default.tag;

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
                    inputElement = <CatsubSelector OnChange={this.props.OnCatsubChange} label={this.props.propData.label} />;
                    break;
                case "set":
                    inputElement = <CountrySelector label={this.props.propData.label} />;
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