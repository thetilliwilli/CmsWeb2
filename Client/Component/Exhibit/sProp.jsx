"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from "material-ui/Divider";

export default class SProp extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        const displayRu = this.props.propData.notMultiLang === true
            ? "initial"
            : (this.props.lang === "ru" ? "initial":"none");
        const displayEn = this.props.propData.notMultiLang === true
            ? "none"
            : (this.props.lang === "en" ? "initial":"none");

        return (
            <li className="SProp">
                <div className="SProp_Ru" style={{display:displayRu}}>
                    {
                        this.props.propData.type === "string"
                            ? <TextField underlineShow={false} name={"ru."+this.props.propName} floatingLabelText={this.props.propData.label} defaultValue={this.props.propData.ru} fullWidth/>
                            : <DatePicker underlineShow={false} name={"ru."+this.props.propName} floatingLabelText={this.props.propData.label} openToYearSelection defaultDate={new Date(this.props.propData.ru)}/>
                    }
                </div>
                <div className="SProp_En" style={{display:displayEn}}>
                    {
                        this.props.propData.type === "string"
                            ? <TextField underlineShow={false} name={"en."+this.props.propName} floatingLabelText={this.props.propData.label} defaultValue={this.props.propData.en} fullWidth/>
                            : <DatePicker underlineShow={false} name={"en."+this.props.propName} floatingLabelText={this.props.propData.label} openToYearSelection defaultDate={new Date(this.props.propData.en)}/>
                    }
                </div>
                <Divider />
            </li>
        );
    }
}