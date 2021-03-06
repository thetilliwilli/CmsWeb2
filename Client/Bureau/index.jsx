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

export default class Bureau extends React.Component
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
        this.SubmitNewBureau = this.SubmitNewBureau.bind(this);
        this.SubmitBureauUpdate = this.SubmitBureauUpdate.bind(this);
    }

    shouldComponentUpdate(){
        return true;
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

    SubmitNewBureau(){
        var bureauData = this.Data();
        var error = this.HasError(bureauData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitNewBureau(bureauData);
    }

    SubmitBureauUpdate(){
        var bureauData = this.Data();
        var error = this.HasError(bureauData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitBureauUpdate(bureauData, this.props.data._id);
    }

    HasError(data){
        return null;
    }

    RegisterStaticPropsRef(component){ this.StaticPropsRef = component;}
    RegisterVariablePropsRef(component){ this.VariablePropsRef = component;}
    RegisterAvatarRef(component){ this.AvatarRef = component;}
    RegisterImageGalleryRef(component){ this.ImageGalleryRef = component;}

    ToBureauData(dto){
        var staticProps = {};
            staticProps.shortName = {ru: dto.shortName, en: dto.shortName, label:"Название", type:"string"};
            staticProps.fullName = {ru: dto.fullName, en: dto.fullName, label:"Полное наименование", type:"string"};
            staticProps.description = {ru: dto.description, en: dto.description, label:"Описание", type:"string"};
            // staticProps.designers = {ru: dto.designers, en: dto.designers, label:"designers", type:"string"};
        return {staticProps, previewImage: dto.preview, logotypeImage: dto.logotype, id: dto._id};
    }

    render(){
        const bureauData = this.ToBureauData(this.props.data);
        const columnWidth = util.IfLandscape("33.33%", "100%");
        const columnHeight = util.IfLandscape("100%", "initial");
        const outerHeights = util.IfLandscape({header:"6%", body:"94%"}, {header:"initial", body:"initial"});
        const hiddenInPortrait = util.IfLandscape("initial", "none");
        return (
            <div key={this.props.uuid} className="Bureau" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:outerHeights.header, borderBottom:"2px solid lightgrey"}}>
                    <ControlPanel 
                        handlers={{OnClear: this.props.Clear, OnSubmitNewBureau: this.SubmitNewBureau, OnSubmitBureauUpdate: this.SubmitBureauUpdate, ResetEditData: this.props.ResetEditData}}
                        blockControl={this.props.blockControl} isEditMode={this.props.isEditMode}
                        templateName={bureauData.staticProps.fullName.ru}
                        templateIndex={bureauData.id}
                    />
                </div>

                <div className="BureauForm" style={{width:"100%", height:outerHeights.body, display:"flex", overflow:"auto", flexDirection:"column", justifyContent:"flex-start"}}>
                    
                    <div style={{width:"100%"}}>
                        <LangSelector/>
                    </div>

                    <div className="BureauParts" style={{width:"100%", display:"flex", flex:"1", flexWrap:"wrap"}}>
                        <div className="StaticPropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} previewHref={bureauData.previewImage} logotypeHref={bureauData.logotypeImage}/>
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={bureauData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto", display:hiddenInPortrait}} >
                            <Placeholder />
                        </div>
                        <div className="GalleryField" style={{width:columnWidth, border:"1px solid lightgrey", display:hiddenInPortrait, overflow:"auto"}} >
                            <Placeholder />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}