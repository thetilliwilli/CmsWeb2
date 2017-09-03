"use strict";
import React from "react";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardHeader} from 'material-ui/Card';


class StaticProps extends React.Component
{
    constructor(props){
        super(props);

        this.fields = {};
        this.OnPropChange = this.OnPropChange.bind(this);
    }

    componentWillUnmount(){
        this.props.SaveState(this.fields);
    }

    OnPropChange(event, newValue){
        this.fields[event.target.name] = newValue;
    }

    render(){
        if(this.props.language === "ru")
        {
            return (
                <div className="StaticProps" key="StaticPropsRu">
                    <CardHeader  subtitle="ОБЩИЕ RU" />
                    <TextField name="title" floatingLabelText="Заголовок Экспоната" defaultValue={this.props.data.title} onChange={this.OnPropChange}/>
                    <br />
                    <TextField name="subtitle" floatingLabelText="Подзаголовок Экспоната" defaultValue={this.props.data.subtitle} onChange={this.OnPropChange}/>
                    <br />
                    <TextField name="location" floatingLabelText="Место производство" defaultValue={this.props.data.location}  onChange={this.OnPropChange}/>
                    <br />
                    <DatePicker name="date" floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date(this.props.data.date)}  onChange={this.OnPropChange} />
                    <br />
                    <TextField name="history" floatingLabelText="История создания"  defaultValue={this.props.data.history} multiLine rowsMax={6} fullWidth  onChange={this.OnPropChange}/>
                    <br />
                    <TextField name="description" floatingLabelText="Подробное описание"  defaultValue={this.props.data.description} multiLine rowsMax={6} fullWidth onChange={this.OnPropChange}/>
                </div>
            );
        }
        else
        {
            return (
                    <div className="StaticProps" key="StaticPropsEn">
                        <CardHeader  subtitle="ОБЩИЕ EN" />
                        <TextField name="title" floatingLabelText="Заголовок Экспоната" defaultValue={this.props.data.title} />
                        <br />
                        <TextField name="subtitle" floatingLabelText="Подзаголовок Экспоната" defaultValue={this.props.data.subtitle} />
                        <br />
                        <TextField name="location" floatingLabelText="Место производство" defaultValue={this.props.data.location} />
                        <br />
                        <DatePicker name="date" floatingLabelText="Дата создания" openToYearSelection defaultDate={new Date(this.props.data.date)}></DatePicker>
                        <br />
                        <TextField name="history" floatingLabelText="История создания" defaultValue={this.props.data.history} multiLine rowsMax={6} fullWidth/>
                        <br />
                        <TextField name="description" floatingLabelText="Подробное описание" defaultValue={this.props.data.description} multiLine rowsMax={6} fullWidth/>
                    </div>
            );
        }
    }
}

import {connect} from "react-redux";
import {SaveStateStaticPropsRu} from "../../App/ac.js";
export default connect(null, (dispatch)=>{return {
    SaveState: (fields)=>{dispatch(SaveStateStaticPropsRu(fields))}
}})(StaticProps);