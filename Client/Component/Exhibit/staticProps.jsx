"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardHeader} from 'material-ui/Card';


export default class StaticProps extends React.Component
{
    render(){
        return (
            <div className="StaticProps">
                <CardHeader  subtitle="ОБЩИЕ" />
                <TextField floatingLabelText="Заголовок Экспоната" />
                <br />
                <TextField floatingLabelText="Подзаголовок Экспоната" />
                <br />
                <TextField floatingLabelText="Место производство" />
                <br />
                <DatePicker floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date()}></DatePicker>
                <br />
                <TextField floatingLabelText="История создания" multiLine rowsMax={6} fullWidth/>
                <br />
                <TextField floatingLabelText="Подробное описание" multiLine rowsMax={6} fullWidth/>
            </div>
        );
    }
}