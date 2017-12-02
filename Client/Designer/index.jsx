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

export default class Designer extends React.Component
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
        this.SubmitNewDesigner = this.SubmitNewDesigner.bind(this);
        this.SubmitDesignerUpdate = this.SubmitDesignerUpdate.bind(this);
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
            staticProps.shortName = staticProps.shortName.ru;
            staticProps.fullName = staticProps.fullName.ru;
            staticProps.description = staticProps.description.ru;
            // staticProps.designers = staticProps.designers.ru;
        
        // var variableProps = this.VariablePropsRef.Data();

        var avatar = this.AvatarRef.Data();
        var previewImageOrUndefined = avatar.previewSrc === DEFAULT_IMAGE_AVATAR ? undefined : avatar.previewSrc;
        var logotypeImageOrUndefined = avatar.logotypeSrc === DEFAULT_IMAGE_AVATAR ? undefined : avatar.logotypeSrc;

        // var gallery = this.ImageGalleryRef.Data();
        // gallery = gallery.map(img=>({image:img.src, description:img.description}));

        var result = {...staticProps, previewImage: previewImageOrUndefined, logotypeImage: logotypeImageOrUndefined,};
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
    RegisterVariablePropsRef(component){ this.VariablePropsRef = component;}
    RegisterAvatarRef(component){ this.AvatarRef = component;}
    RegisterImageGalleryRef(component){ this.ImageGalleryRef = component;}

    ToDesignerData(dto){
        var staticProps = {};
            staticProps.shortName = {ru: dto.shortName, en: dto.shortName, label: "shortName", type:"string"};
            staticProps.fullName = {ru: dto.fullName, en: dto.fullName, label: "fullName", type:"string"};
            staticProps.birthDate = {ru: dto.birthDate, en: dto.birthDate, label: "birthDate", type:"string"};
            staticProps.deathDate = {ru: dto.deathDate, en: dto.deathDate, label: "deathDate", type:"string"};
            staticProps.birthPlace = {ru: dto.birthPlace, en: dto.birthPlace, label: "birthPlace", type:"string"};
            staticProps.position = {ru: dto.position, en: dto.position, label: "position", type:"string"};
            staticProps.totalXP = {ru: dto.totalXP, en: dto.totalXP, label: "totalXP", type:"string"};
            staticProps.industryXP = {ru: dto.industryXP, en: dto.industryXP, label: "industryXP", type:"string"};
            staticProps.education = {ru: dto.education, en: dto.education, label: "education", type:"string"};
            staticProps.degree = {ru: dto.degree, en: dto.degree, label: "degree", type:"string"};
            staticProps.biography = {ru: dto.biography, en: dto.biography, label: "biography", type:"string"};
            staticProps.awards = {ru: dto.awards, en: dto.awards, label: "awards", type:"string"};
            staticProps.characteristics = {ru: dto.characteristics, en: dto.characteristics, label: "characteristics", type:"string"};
            staticProps.bureau = {ru: dto.bureau, en: dto.bureau, label: "bureau", type:"string"};
            // staticProps.portrait = {ru: dto.portrait, en: dto.portrait, label: "portrait", type:"string"};
        return {staticProps, previewImage: dto.preview, logotypeImage: dto.logotype, id: dto._id};
    }

    render(){
        const designerData = this.ToDesignerData(this.props.data);
        const columnWidth = (window.innerWidth / window.innerHeight) > 1.0
            ? "33.33%"
            : "100%";
        return (
            <div key={this.props.uuid} className="Designer" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:"6%"}}>
                    <ControlPanel 
                        handlers={{OnClear: this.props.Clear, OnSubmitNewDesigner: this.SubmitNewDesigner, OnSubmitDesignerUpdate: this.SubmitDesignerUpdate, ResetEditData: this.props.ResetEditData}}
                        blockControl={this.props.blockControl} isEditMode={this.props.isEditMode}
                        templateName={designerData.staticProps.fullName.ru}
                        templateIndex={designerData.id}
                    />
                </div>

                <div className="DesignerForm" style={{width:"100%", height:"94%", display:"flex", flexWrap:"wrap"}}>
                    
                    <div style={{width:"100%", height:"6%"}}>
                        <LangSelector />
                    </div>

                    <div className="DesignerParts" style={{width:"100%", height:"94%", display:"flex", flexWrap:"wrap"}}>
                        <div className="StaticPropsField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} previewHref={designerData.previewImage} logotypeHref={designerData.logotypeImage}/>
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={designerData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey", overflow:"auto"}} >
                            <VariableProps RegCom={this.RegisterVariablePropsRef} items={[]} language={this.props.language} />
                        </div>
                        <div className="GalleryField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey"}} >
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} images={[]} language={this.props.language}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}