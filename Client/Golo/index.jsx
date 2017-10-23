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

export default class Golo extends React.Component
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
        this.SubmitNewGolo = this.SubmitNewGolo.bind(this);
        this.SubmitGoloUpdate = this.SubmitGoloUpdate.bind(this);
        this.SubscribeToWindowResize = this.SubscribeToWindowResize.bind(this);
    }

    shouldComponentUpdate(){
        return true;
    }

    componentDidMount(){
        window.addEventListener("resize", this.SubscribeToWindowResize);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.SubscribeToWindowResize);
    }

    SubscribeToWindowResize(){
        const isLandscape = (window.innerWidth / window.innerHeight) > 1.0;
        const columnWidth = isLandscape ? "33.33%" : "100%";
        window.document.querySelectorAll(".AdaptiveLayoutColumn").forEach(el => el.style.width = columnWidth);
    }

    Data(){
        var staticProps = this.StaticPropsRef.Data();
        staticProps.date = staticProps.date.ru;//Берем только одно значение

        var variableProps = this.VariablePropsRef.Data();

        var avatar = this.AvatarRef.Data();
        var coverImageOrUndefined = avatar.src === "/static/img/defaultGoloAvatar.jpg" ? undefined : avatar.src;

        var gallery = this.ImageGalleryRef.Data();
        gallery = gallery.map(img=>({image:img.src, description:img.description}));

        var result = {...staticProps, fields: variableProps, coverImage: coverImageOrUndefined, imageGallery: gallery};
        return result;
    }

    SubmitNewGolo(){
        var goloData = this.Data();
        var error = this.HasError(goloData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitNewGolo(goloData);
    }

    SubmitGoloUpdate(){
        var goloData = this.Data();
        var error = this.HasError(goloData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitGoloUpdate(goloData, this.props.data._id);
    }

    HasError(data){
        return null;
        // var errors = data.fields.reduce((result, field, index)=>{
        //     var ruError = field.ru.name.trim() == "" || field.ru.value.trim() == "";
        //     var enError = field.en.name.trim() == "" || field.en.value.trim() == "";
        //     if(ruError || enError)
        //         result.push(`${index}) [${field.ru.name}] [${field.ru.value}] [${field.en.name}] [${field.en.value}]`);
        //     return result;
        // }, []);
        // return errors.length === 0 ? null : {message: `[Характеристики]: Остались незаполненные поля.\n${errors.join("\n")}`};
    }

    RegisterStaticPropsRef(component){ this.StaticPropsRef = component;}
    RegisterVariablePropsRef(component){ this.VariablePropsRef = component;}
    RegisterAvatarRef(component){ this.AvatarRef = component;}
    RegisterImageGalleryRef(component){ this.ImageGalleryRef = component;}

    ToGoloData(dto){
        var staticProps = {};
            staticProps.name = {...dto.name, label:"Название Экспоната", type:"string"};
            staticProps.title = {...dto.title, label:"Заголовок Экспоната", type:"string"};
            staticProps.subtitle = {...dto.subtitle, label:"Подзаголовок Экспоната", type:"string"};
            staticProps.location = {...dto.location, label:"Место производство", type:"string"};
            staticProps.description = {...dto.description, label:"Подробное описание", type:"string"};
            // staticProps.history = {...dto.history, label:"История создания", type:"string"};
            staticProps.date = {ru: dto.date, en: dto.date, label:"Дата создания", type:"date", notMultiLang:true};

        var variableProps = dto.fields;

        var imageGallery = dto.imageGallery.map(i => ({src: i.image, id: i.guid, description: i.description}));

        // var imageHref = dto.coverImage;

        return {staticProps, variableProps, imageGallery, coverImage: dto.coverImage};
    }

    render(){
        const goloData = this.ToGoloData(this.props.data);
        const columnWidth = (window.innerWidth / window.innerHeight) > 1.0
            ? "33.33%"
            : "100%";
        return (
            <div key={this.props.uuid} className="Golo" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:"6%"}}>
                    <ControlPanel 
                        handlers={{OnClear: this.props.Clear, OnSubmitNewGolo: this.SubmitNewGolo, OnSubmitGoloUpdate: this.SubmitGoloUpdate}}
                        blockControl={this.props.data.blockControl} isEditMode={this.props.isEditMode}
                    />
                </div>

                <div className="GoloForm" style={{width:"100%", height:"94%", display:"flex", flexWrap:"wrap"}}>
                    
                    <div style={{width:"100%", height:"6%"}}>
                        <LangSelector />
                    </div>

                    <div className="GoloParts" style={{width:"100%", height:"94%", display:"flex", flexWrap:"wrap"}}>
                        <div className="StaticPropsField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} imageHref={goloData.coverImage}/>
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={goloData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey", overflow:"auto"}} >
                            <VariableProps RegCom={this.RegisterVariablePropsRef} items={goloData.variableProps} language={this.props.language} />
                        </div>
                        <div className="GalleryField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey"}} >
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} images={goloData.imageGallery} language={this.props.language}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}