"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from "material-ui/Divider";

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

        if(this.props.lang==="ru")
            newState.data.ru = newValue;
        else
            newState.data.en = newValue;

        this.setState(newState);
    }

    render(){
        const displayRu = this.props.propData.notMultiLang === true
            ? "initial"
            : (this.props.lang === "ru" ? "initial":"none");
        const displayEn = this.props.propData.notMultiLang === true
            ? "none"
            : (this.props.lang === "en" ? "initial":"none");

        const ruDate = this.state.data.ru && new Date(this.state.data.ru) || null;
        const enDate = this.state.data.en && new Date(this.state.data.en) || null;

        const propName = this.props.propName;
        const hideLocationAndDateOfCreation = propName==="location"||propName==="date" ? "none" : "initial";
        return (
            <li className="SProp" style={{display:hideLocationAndDateOfCreation}}>
                <div className="SProp_Ru" style={{display:displayRu}}>
                    {
                        this.props.propData.type === "string"
                            ? <TextField onChange={this.OnChange} name={"ru."+propName} floatingLabelText={this.props.propData.label} value={this.state.data.ru} fullWidth/>
                            : <DatePicker onChange={this.OnChange} name={"ru."+propName} floatingLabelText={this.props.propData.label} value={ruDate} openToYearSelection/>
                    }
                </div>
                <div className="SProp_En" style={{display:displayEn}}>
                    {
                        this.props.propData.type === "string"
                            ? <TextField onChange={this.OnChange} name={"en."+propName} floatingLabelText={this.props.propData.label} value={this.state.data.en} fullWidth/>
                            : <DatePicker onChange={this.OnChange} name={"en."+propName} floatingLabelText={this.props.propData.label} value={enDate} openToYearSelection/>
                    }
                </div>
            </li>
        );
    }
}