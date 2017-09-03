"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardHeader} from 'material-ui/Card';


export default class StaticProps extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        var lang = this.props.language;
        return (
            <div className="StaticProps">

                <div className="StaticProps_RuVersion" style={{display:( lang === "ru" ? "initial":"none")}}>
                    <CardHeader  subtitle="ОБЩИЕ - Русский" />
                    <TextField name="title" floatingLabelText="Заголовок Экспоната" defaultValue={this.props.data.ru.title} onChange={this.OnPropChange}/>
                    <br />
                    <TextField name="subtitle" floatingLabelText="Подзаголовок Экспоната" defaultValue={this.props.data.ru.subtitle} onChange={this.OnPropChange}/>
                    <br />
                    <TextField name="location" floatingLabelText="Место производство" defaultValue={this.props.data.ru.location}  onChange={this.OnPropChange}/>
                    <br />
                    <DatePicker name="date" floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date(this.props.data.ru.date)}  onChange={this.OnPropChange} />
                    <br />
                    <TextField name="history" floatingLabelText="История создания"  defaultValue={this.props.data.ru.history} multiLine rowsMax={6} fullWidth  onChange={this.OnPropChange}/>
                    <br />
                    <TextField name="description" floatingLabelText="Подробное описание"  defaultValue={this.props.data.ru.description} multiLine rowsMax={6} fullWidth onChange={this.OnPropChange}/>
                </div>

                <div className="StaticProps_EnVersion" style={{display:( lang === "en" ? "initial":"none")}}>
                        <CardHeader  subtitle="ОБЩИЕ EN" />
                        <TextField name="title" floatingLabelText="Заголовок Экспоната" defaultValue={this.props.data.en.title} />
                        <br />
                        <TextField name="subtitle" floatingLabelText="Подзаголовок Экспоната" defaultValue={this.props.data.en.subtitle} />
                        <br />
                        <TextField name="location" floatingLabelText="Место производство" defaultValue={this.props.data.en.location} />
                        <br />
                        <DatePicker name="date" floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date(this.props.data.en.date)}></DatePicker>
                        <br />
                        <TextField name="history" floatingLabelText="История создания" defaultValue={this.props.data.en.history} multiLine rowsMax={6} fullWidth/>
                        <br />
                        <TextField name="description" floatingLabelText="Подробное описание" defaultValue={this.props.data.en.description} multiLine rowsMax={6} fullWidth/>
                    </div>
            </div>
        );
    }
}