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

import util from "../Module/util.js";

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
    }

    shouldComponentUpdate(){
        return true;
    }

    Data(){
        var staticProps = this.StaticPropsRef.Data();
        staticProps.date = staticProps.date.ru;//Берем только одно значение
        staticProps.complex = staticProps.complex.ru;//Берем только одно значение
        staticProps.ordinal = staticProps.ordinal.ru;//Берем только одно значение
        
        var variableProps = this.VariablePropsRef.Data();

        var avatar = this.AvatarRef.Data();

        var gallery = this.ImageGalleryRef.Data();
        gallery = gallery.map(img=>({image:img.src, description:img.description}));

        var result = {...staticProps, fields: variableProps, video: avatar.src, imageGallery: gallery};
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
            staticProps.complex = {ru: dto.complex, en: dto.complex, label:"Витрина", type:"string", notMultiLang:true};
            staticProps.ordinal = {ru: dto.ordinal, en: dto.ordinal, label:"Порядковый номер", type:"string", notMultiLang:true};

        var variableProps = dto.fields;

        var imageGallery = dto.imageGallery.map(i => ({src: i.image, id: i.guid, description: i.description}));

        return {staticProps, variableProps, imageGallery, video: dto.video, id: dto._id};
    }

    render(){
        const goloData = this.ToGoloData(this.props.data);
        const columnWidth = util.IfLandscape("33.33%", "100%");
        const columnHeight = util.IfLandscape("100%", "initial");
        const outerHeights = util.IfLandscape({header:"6%", body:"94%"}, {header:"initial", body:"initial"});
        return (
            <div key={this.props.uuid} className="Golo" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:outerHeights.header, borderBottom:"2px solid lightgrey"}}>
                    <ControlPanel 
                        handlers={{OnClear: this.props.Clear, OnSubmitNewGolo: this.SubmitNewGolo, OnSubmitGoloUpdate: this.SubmitGoloUpdate, ResetEditData: this.props.ResetEditData}}
                        blockControl={this.props.blockControl} isEditMode={this.props.isEditMode}
                        templateName={goloData.staticProps.name.ru}
                        templateIndex={goloData.id}
                    />
                </div>

                <div className="GoloForm" style={{width:"100%", height:outerHeights.body, display:"flex", overflow:"auto", flexDirection:"column", justifyContent:"flex-start"}}>
                    
                    <div style={{width:"100%"}}>
                        <LangSelector />
                    </div>

                    <div className="GoloParts" style={{width:"100%", display:"flex", flex:"1", flexWrap:"wrap"}}>
                        <div className="StaticPropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} imageHref={goloData.video}/>
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={goloData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <VariableProps RegCom={this.RegisterVariablePropsRef} items={goloData.variableProps} language={this.props.language} />
                        </div>
                        <div className="GalleryField" style={{width:columnWidth, border:"1px solid lightgrey", overflow:"auto"}} >
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} images={goloData.imageGallery} language={this.props.language}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}