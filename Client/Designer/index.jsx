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
import Placeholder from "../Component/placeholder.jsx";

import {DEFAULT_IMAGE_AVATAR} from "../Module/consts.js";
import util from "../Module/util.js";

export default class Designer extends React.Component
{
    constructor(props){
        super(props);

        this.StaticPropsRef = null;
        this.VariablePropsRef = null;
        this.AvatarRef = null;
        this.ImageGalleryRef = null;
        
        this.RegisterStaticPropsRef = this.RegisterStaticPropsRef.bind(this);
        this.RegisterStaticPropsRef2 = this.RegisterStaticPropsRef2.bind(this);
        this.RegisterStaticPropsRef3 = this.RegisterStaticPropsRef3.bind(this);
        this.RegisterVariablePropsRef = this.RegisterVariablePropsRef.bind(this);
        this.RegisterAvatarRef = this.RegisterAvatarRef.bind(this);
        this.RegisterImageGalleryRef = this.RegisterImageGalleryRef.bind(this);
        this.SubmitNewDesigner = this.SubmitNewDesigner.bind(this);
        this.SubmitDesignerUpdate = this.SubmitDesignerUpdate.bind(this);
    }

    shouldComponentUpdate(){
        return true;
    }

    componentDidMount(){
        if(this.props.bureauOverview.length === 0)
            this.props.FetchOverview();//обновляем данные по КБ - для bureauID enum'a
    }

    Data(){
        var staticProps = this.StaticPropsRef.Data();
            staticProps.shortName = staticProps.shortName.ru; 
            staticProps.fullName = staticProps.fullName.ru; 
            staticProps.birthDate = staticProps.birthDate.ru; 
            staticProps.deathDate = staticProps.deathDate.ru; 
            staticProps.birthPlace = staticProps.birthPlace.ru; 
            staticProps.position = staticProps.position.ru; 
        var staticProps2 = this.StaticPropsRef2.Data();
            staticProps2.totalXP = staticProps2.totalXP.ru; 
            staticProps2.industryXP = staticProps2.industryXP.ru; 
            staticProps2.education = staticProps2.education.ru; 
            staticProps2.degree = staticProps2.degree.ru; 
            staticProps2.bureau = staticProps2.bureau.ru; 
        var staticProps3 = this.StaticPropsRef3.Data();
            staticProps3.biography = staticProps3.biography.ru; 
            staticProps3.awards = staticProps3.awards.ru; 
            staticProps3.characteristics = staticProps3.characteristics.ru; 
            
        var avatar = this.AvatarRef.Data();
        var coverImageOrUndefined = avatar.src === DEFAULT_IMAGE_AVATAR ? undefined : avatar.src;

        var result = {...staticProps, ...staticProps2, ...staticProps3, portrait: coverImageOrUndefined};
        return result;
    }

    SubmitNewDesigner(){
        var designerData = this.Data();
        var error = this.HasError(designerData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitNewDesigner(designerData);
    }

    SubmitDesignerUpdate(){
        var designerData = this.Data();
        var error = this.HasError(designerData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitDesignerUpdate(designerData, this.props.data._id);
    }

    HasError(data){
        return null;
    }

    RegisterStaticPropsRef(component){ this.StaticPropsRef = component;}
    RegisterStaticPropsRef2(component){ this.StaticPropsRef2 = component;}
    RegisterStaticPropsRef3(component){ this.StaticPropsRef3 = component;}
    RegisterVariablePropsRef(component){ this.VariablePropsRef = component;}
    RegisterAvatarRef(component){ this.AvatarRef = component;}
    RegisterImageGalleryRef(component){ this.ImageGalleryRef = component;}

    ToDesignerData(dto){
        var staticProps = {};
            staticProps.shortName = {ru: dto.shortName, en: dto.shortName, label: "Инициалы", type:"string"};
            staticProps.fullName = {ru: dto.fullName, en: dto.fullName, label: "ФИО", type:"string"};
            staticProps.birthDate = {ru: dto.birthDate, en: dto.birthDate, label: "Дата рождения", type:"string"};
            staticProps.deathDate = {ru: dto.deathDate, en: dto.deathDate, label: "Дата смерти", type:"string"};
            staticProps.birthPlace = {ru: dto.birthPlace, en: dto.birthPlace, label: "Место рождения", type:"string"};
            staticProps.position = {ru: dto.position, en: dto.position, label: "Должность", type:"string"};
        var staticProps2 = {};
            staticProps2.totalXP = {ru: dto.totalXP, en: dto.totalXP, label: "Опыт", type:"string"};
            staticProps2.industryXP = {ru: dto.industryXP, en: dto.industryXP, label: "Опыт в индустрии", type:"string"};
            staticProps2.education = {ru: dto.education, en: dto.education, label: "Образование", type:"string"};
            staticProps2.degree = {ru: dto.degree, en: dto.degree, label: "Ученая степень", type:"string"};
            staticProps2.bureau = {ru: dto.bureau, en: dto.bureau, label: "Предприятие ID", type:"enum"};
        var staticProps3 = {};
            staticProps3.biography = {ru: dto.biography, en: dto.biography, label: "Трудовая биография", type:"string"};
            staticProps3.awards = {ru: dto.awards, en: dto.awards, label: "Государственные награды", type:"string"};
            staticProps3.characteristics = {ru: dto.characteristics, en: dto.characteristics, label: "Характеристики вклада в отрасль", type:"string"};
        
        return {staticProps, staticProps2, staticProps3, coverImage: dto.portrait, id: dto._id};
    }

    render(){
        const bureauEnum = this.props.bureauOverview.map(kb => kb.fullName);
        const designerData = this.ToDesignerData(this.props.data);
        const columnWidth = util.IfLandscape("33.33%", "100%");
        const columnHeight = util.IfLandscape("100%", "initial");
        const outerHeights = util.IfLandscape({header:"6%", body:"94%"}, {header:"initial", body:"initial"});
        return (
            <div key={this.props.uuid} className="Designer" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:outerHeights.header, borderBottom:"2px solid lightgrey"}}>
                    <ControlPanel 
                        handlers={{OnClear: this.props.Clear, OnSubmitNewDesigner: this.SubmitNewDesigner, OnSubmitDesignerUpdate: this.SubmitDesignerUpdate, ResetEditData: this.props.ResetEditData}}
                        blockControl={this.props.blockControl} isEditMode={this.props.isEditMode}
                        templateName={designerData.staticProps.fullName.ru}
                        templateIndex={designerData.id}
                    />
                </div>

                <div className="DesignerForm" style={{width:"100%", height:outerHeights.body, display:"flex", overflow:"auto", flexDirection:"column", justifyContent:"flex-start"}}>
                    
                    <div style={{width:"100%"}}>
                        <LangSelector />
                    </div>

                    <div className="DesignerParts" style={{width:"100%", display:"flex", flex:"1", flexWrap:"wrap"}}>
                        <div className="StaticPropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} imageHref={designerData.coverImage} />
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={designerData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <StaticProps RegCom={this.RegisterStaticPropsRef2} propList={designerData.staticProps2} language={this.props.language} bureauEnum={bureauEnum}/>
                        </div>
                        <div className="GalleryField" style={{width:columnWidth, border:"1px solid lightgrey", overflow:"auto"}} >
                            <StaticProps RegCom={this.RegisterStaticPropsRef3} propList={designerData.staticProps3} language={this.props.language}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}