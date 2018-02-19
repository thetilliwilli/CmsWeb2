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

import {DEFAULT_IMAGE_AVATAR} from "../Module/consts.js";
import util from "../Module/util.js";

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
        this.SubmitNewExhibit = this.SubmitNewExhibit.bind(this);
        this.SubmitExhibitUpdate = this.SubmitExhibitUpdate.bind(this);
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
        var coverImageOrUndefined = avatar.src === DEFAULT_IMAGE_AVATAR ? undefined : avatar.src;

        var gallery = this.ImageGalleryRef.Data();
        gallery = gallery.map(img=>({image:img.src, description:img.description}));

        var result = {...staticProps, fields: variableProps, coverImage: coverImageOrUndefined, imageGallery: gallery};
        return result;
    }

    SubmitNewExhibit(){
        var exhibitData = this.Data();
        var error = this.HasError(exhibitData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitNewExhibit(exhibitData);
    }

    SubmitExhibitUpdate(){
        var exhibitData = this.Data();
        var error = this.HasError(exhibitData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitExhibitUpdate(exhibitData, this.props.data._id);
    }

    HasError(data){
        return null;
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
            staticProps.complex = {ru: dto.complex, en: dto.complex, label:"Витрина", type:"string", notMultiLang:true};
            staticProps.ordinal = {ru: dto.ordinal, en: dto.ordinal, label:"Порядковый номер", type:"string", notMultiLang:true};

        var variableProps = dto.fields;

        var imageGallery = dto.imageGallery.map(i => ({src: i.image, id: i.guid, description: i.description}));

        // var imageHref = dto.coverImage;

        return {staticProps, variableProps, imageGallery, coverImage: dto.coverImage, id: dto._id};
    }

    render(){
        const exhibitData = this.ToExhibitData(this.props.data);
        const columnWidth = util.IfLandscape("33.33%", "100%");
        const columnHeight = util.IfLandscape("100%", "initial");
        const outerHeights = util.IfLandscape({header:"6%", body:"94%"}, {header:"initial", body:"initial"});
        // const innerHeights = util.IfLandscape({header:"7%", body:"93%"}, {header:"initial", body:"initial"});
        return (
            <div key={this.props.uuid} className="Exhibit" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:outerHeights.header}}>
                    <ControlPanel 
                        handlers={{OnClear: this.props.Clear, OnSubmitNewExhibit: this.SubmitNewExhibit, OnSubmitExhibitUpdate: this.SubmitExhibitUpdate, ResetEditData: this.props.ResetEditData}}
                        blockControl={this.props.blockControl} isEditMode={this.props.isEditMode}
                        templateName={exhibitData.staticProps.name.ru}
                        templateIndex={exhibitData.id}
                    />
                </div>

                <div className="ExhibitForm" style={{width:"100%", height:outerHeights.body, display:"flex", flexWrap:"wrap", overflow:"auto", flexDirection:"column", justifyContent:"flex-start"}}>
                    
                    <div style={{width:"100%"}}>
                        <LangSelector />
                    </div>

                    <div className="ExhibitParts" style={{width:"100%", display:"flex", flexWrap:"wrap", flex:"1"}}>
                        <div className="StaticPropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} imageHref={exhibitData.coverImage}/>
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={exhibitData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <VariableProps RegCom={this.RegisterVariablePropsRef} items={exhibitData.variableProps} language={this.props.language} />
                        </div>
                        <div className="GalleryField" style={{width:columnWidth, border:"1px solid lightgrey", overflow:"auto"}} >
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} images={exhibitData.imageGallery} language={this.props.language}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}