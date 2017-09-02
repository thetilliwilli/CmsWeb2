"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


export default class StaticProps extends React.Component
{
    render(){
        return (
            <div className="StaticProps">
                <TextField floatingLabelText="Заголовок Экспоната" />
                <br />
                <TextField floatingLabelText="Подзаголовок Экспоната" />
                <br />
                <TextField floatingLabelText="Место производство" />
                <br />
                <DatePicker floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date()}></DatePicker>
                <br />
                <TextField floatingLabelText="История создания" multiLine fullWidth/>
                <br />
                <TextField floatingLabelText="Подробное описание" multiLine fullWidth/>
            </div>
        );
    }
}