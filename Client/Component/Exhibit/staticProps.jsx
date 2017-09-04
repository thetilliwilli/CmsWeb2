"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardHeader} from 'material-ui/Card';
import Divider from "material-ui/Divider";

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

                    <TextField underlineShow={false} name="name" floatingLabelText="Название Экспоната" defaultValue={this.props.data.ru.name}/>
                    <Divider />
                    <TextField underlineShow={false} name="title" floatingLabelText="Заголовок Экспоната" defaultValue={this.props.data.ru.title}/>
                    <Divider />
                    <TextField underlineShow={false} name="subtitle" floatingLabelText="Подзаголовок Экспоната" defaultValue={this.props.data.ru.subtitle}/>
                    <Divider />
                    <TextField underlineShow={false} name="location" floatingLabelText="Место производство" defaultValue={this.props.data.ru.location} />
                    <Divider />
                    <DatePicker underlineShow={false} name="date" floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date(this.props.data.ru.date)}  />
                    <Divider />
                    <TextField underlineShow={false} name="history" floatingLabelText="История создания"  defaultValue={this.props.data.ru.history} multiLine rowsMax={6} fullWidth />
                    <Divider />
                    <TextField underlineShow={false} name="description" floatingLabelText="Подробное описание"  defaultValue={this.props.data.ru.description} multiLine rowsMax={6} fullWidth/>
                </div>

                <div className="StaticProps_EnVersion" style={{display:( lang === "en" ? "initial":"none")}}>
                        <CardHeader  subtitle="ОБЩИЕ - Английский" />

                        <TextField underlineShow={false} name="name" floatingLabelText="Название Экспоната" defaultValue={this.props.data.en.name} />
                        <Divider />
                        <TextField underlineShow={false} name="title" floatingLabelText="Заголовок Экспоната" defaultValue={this.props.data.en.title} />
                        <Divider />
                        <TextField underlineShow={false} name="subtitle" floatingLabelText="Подзаголовок Экспоната" defaultValue={this.props.data.en.subtitle} />
                        <Divider />
                        <TextField underlineShow={false} name="location" floatingLabelText="Место производство" defaultValue={this.props.data.en.location} />
                        <Divider />
                        <DatePicker underlineShow={false} name="date" floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date(this.props.data.en.date)}></DatePicker>
                        <Divider />
                        <TextField underlineShow={false} name="history" floatingLabelText="История создания" defaultValue={this.props.data.en.history} multiLine rowsMax={6} fullWidth/>
                        <Divider />
                        <TextField underlineShow={false} name="description" floatingLabelText="Подробное описание" defaultValue={this.props.data.en.description} multiLine rowsMax={6} fullWidth/>
                    </div>
            </div>
        );
    }
}