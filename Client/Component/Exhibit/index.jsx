"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';


import LangSelector from "./langSelector.jsx";
import Avatar from "./avatar.jsx";
import StaticProps from "./staticProps.jsx";
import VariableProps from "./variableProps.jsx";
import ImageGallery from "./imageGallery.jsx";
import ControlPanel from "./controlPanel.jsx";

export default class Exhibit extends React.Component
{
    constructor(props){
        super(props);

        this.StaticPropsRef = null;
        this.VariablePropsRef = null;
        this.AvatarRef = null;
        this.ImageGalleryRef = null;
        
        this.RegisterStaticPropsRef = this.RegisterStaticPropsRef.bind(this);
        this.RegisterVariablePropsRef = this.RegisterVariablePropsRef.bind(this);
        this.RegisterAvatarRef = this.RegisterAvatarRef.bind(this);
        this.RegisterImageGalleryRef = this.RegisterImageGalleryRef.bind(this);
        this.Submit = this.Submit.bind(this);
    }

    Data(){
        var staticProps = this.StaticPropsRef.Data();
        staticProps.date = staticProps.date.ru;//Берем только одно значение

        var variableProps = this.VariablePropsRef.Data();

        var avatar = this.AvatarRef.Data();
        var coverImageOrUndefined = avatar.src === "/static/img/defaultExhibitAvatar.jpg" ? undefined : avatar.src;

        var gallery = this.ImageGalleryRef.Data();
        gallery = gallery.map(img=>({image:img.src, description:img.description}));

        var result = {...staticProps, fields: variableProps, coverImage: coverImageOrUndefined, imageGallery: gallery};
        return result;
    }

    Submit(){
        var exhibitData = this.Data();
        var error = this.HasError(exhibitData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitNewExhibit(exhibitData);
    }

    HasError(data){
        return null;
        var errors = data.fields.reduce((result, field, index)=>{
            var ruError = field.ru.name.trim() == "" || field.ru.value.trim() == "";
            var enError = field.en.name.trim() == "" || field.en.value.trim() == "";
            if(ruError || enError)
                result.push(`${index}) [${field.ru.name}] [${field.ru.value}] [${field.en.name}] [${field.en.value}]`);
            return result;
        }, []);
        return errors.length === 0 ? null : {message: `[Характеристики]: Остались незаполненные поля.\n${errors.join("\n")}`};
    }

    RegisterStaticPropsRef(component){ this.StaticPropsRef = component;}
    RegisterVariablePropsRef(component){ this.VariablePropsRef = component;}
    RegisterAvatarRef(component){ this.AvatarRef = component;}
    RegisterImageGalleryRef(component){ this.ImageGalleryRef = component;}

    ToExhibitData(dto){
        var staticProps = {};
            staticProps.name = {...dto.name, label:"Название Экспоната", type:"string"};
            staticProps.title = {...dto.title, label:"Заголовок Экспоната", type:"string"};
            staticProps.subtitle = {...dto.subtitle, label:"Подзаголовок Экспоната", type:"string"};
            staticProps.location = {...dto.location, label:"Место производство", type:"string"};
            staticProps.description = {...dto.description, label:"Подробное описание", type:"string"};
            staticProps.history = {...dto.history, label:"История создания", type:"string"};
            staticProps.date = {ru: dto.date, en: dto.date, label:"Дата создания", type:"date", notMultiLang:true};

        var variableProps = dto.fields;

        var imageGallery = dto.imageGallery;

        return {staticProps, variableProps, imageGallery};
    }
    
    render(){
        const exhibitData = this.ToExhibitData(this.props.data);
        return (
            <div className="Exhibit" style={{height:"100%"}}>
                <ControlPanel OnClick={this.Submit} blockControl={this.props.data.blockControl} isEditMode={this.props.isEditMode} />
                <div className="ExhibitForm" style={{height:"100%"}}>
                    <div>
                        <LangSelector/>
                    </div>
                    <div className="ExhibitParts" style={{position:"relative", height:"100%"}}>
                        <Card className="StaticPropsField" style={{width:"30%", height:"100%", float:"left"}}>
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={exhibitData.staticProps} language={this.props.language}/>
                        </Card>
                        <Card className="VariablePropsField" style={{width:"30%", height:"100%", float:"left"}}>
                            <VariableProps RegCom={this.RegisterVariablePropsRef} items={exhibitData.variableProps} language={this.props.language} />
                        </Card>
                        <Card className="AvatarField" style={{width:"40%", float:"left"}}>
                            <Avatar RegCom={this.RegisterAvatarRef} />
                        </Card>
                        <Card className="GalleryField" style={{width:"40%", float:"left"}}>
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} images={exhibitData.imageGallery}/>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}