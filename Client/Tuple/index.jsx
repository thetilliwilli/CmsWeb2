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

export default class Tuple extends React.Component
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
        this.SubmitNewTuple = this.SubmitNewTuple.bind(this);
        this.SubmitTupleUpdate = this.SubmitTupleUpdate.bind(this);
        this.OnCatsubChange = this.OnCatsubChange.bind(this);
        this.OnCountriesChange = this.OnCountriesChange.bind(this);
        this.Clear = this.Clear.bind(this);

        this.state = {
            selectedCatsub: this.props.data.catsub.trim() || "NONE",
            selectedCountries: this.props.data.countries || [],
        };
    }

    shouldComponentUpdate(){
        return true;
    }

    Data(){
        var staticProps = this.StaticPropsRef.Data();
            staticProps.countries = this.props.data.countries;
            staticProps.catsub = this.props.data.catsub;

        var variableProps = this.VariablePropsRef.Data();

        var avatar = this.AvatarRef.Data();
        var coverImageOrUndefined = avatar.src === DEFAULT_IMAGE_AVATAR ? undefined : avatar.src;

        var gallery = this.ImageGalleryRef.Data();
        gallery = gallery.map(img=>({image:img.src, description:img.description}));

        var result = {...staticProps, fields: variableProps, coverImage: coverImageOrUndefined, imageGallery: gallery};
        return result;
    }

    SubmitNewTuple(){
        var tupleData = this.Data();
        var error = this.HasError(tupleData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitNewTuple(tupleData);
    }

    SubmitTupleUpdate(){
        var tupleData = this.Data();
        var error = this.HasError(tupleData);
        if(error)
            this.props.ShowErrorWindow(error);
        else
            this.props.SubmitTupleUpdate(tupleData, this.props.data._id);
    }

    HasError(data){
        if(data.countries.length === 0)
            return {message:`Выберите страны`};
        if(data.catsub.trim() === "" || data.catsub.trim() === "NONE")
            return {message:`Выберите категорию`};
        return null;//Ошибок нет - все ОК
    }

    RegisterStaticPropsRef(component){ this.StaticPropsRef = component;}
    RegisterVariablePropsRef(component){ this.VariablePropsRef = component;}
    RegisterAvatarRef(component){ this.AvatarRef = component;}
    RegisterImageGalleryRef(component){ this.ImageGalleryRef = component;}

    ToTupleData(dto){
        var staticProps = {};
            staticProps.name = {ru: dto.name, en: dto.name, label:"Название", type:"string"};
            staticProps.catsub = {ru: dto.catsub, en: dto.catsub, label:"Категория", type:"enum"};
                staticProps.catsub.ru = this.state.selectedCatsub;
            staticProps.countries = {ru: dto.countries, en:dto.countries, label:"Страна", type:"set"};
            staticProps.description = {ru: dto.description, en: dto.description, label:"Подробное описание", type:"string"};
        
        var imageGallery = dto.imageGallery.map(i => ({src: i.image, id: i.guid, description: i.description}));

        return {staticProps, imageGallery, coverImage: dto.coverImage, id: dto._id};
    }

    OnCatsubChange(newValue){
        if(this.state.selectedCatsub !== newValue)
        {
            //HACK-START: нарушен закон имютебл дата
            this.state.selectedCatsub = newValue;
            //HACK_END
        }
    }
    
    OnCountriesChange(newValue){
        //HACK-START: danger code - violate immutable principle of state
        this.state.selectedCountries = newValue;
        //HACK-END
    }

    Clear(){
        this.state.selectedCatsub = "NONE";//HACK: violate immutable state
        this.props.Clear && this.props.Clear();
    }

    render(){
        const tupleData = this.ToTupleData(this.props.data);
        const columnWidth = util.IfLandscape("33.33%", "100%");
        const columnHeight = util.IfLandscape("100%", "initial");
        const outerHeights = util.IfLandscape({header:"6%", body:"94%"}, {header:"initial", body:"initial"});
        return (
            <div key={this.props.uuid} className="Tuple" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:outerHeights.header, borderBottom:"2px solid lightgrey"}}>
                    <ControlPanel 
                        handlers={{OnClear: this.Clear, OnSubmitNewTuple: this.SubmitNewTuple, OnSubmitTupleUpdate: this.SubmitTupleUpdate, ResetEditData: this.props.ResetEditData}}
                        blockControl={this.props.blockControl} isEditMode={this.props.isEditMode}
                        templateName={tupleData.staticProps.name.ru}
                        templateIndex={tupleData.id}
                    />
                </div>

                <div className="TupleForm" style={{width:"100%", height:outerHeights.body, display:"flex", overflow:"auto", flexDirection:"column", justifyContent:"flex-start"}}>
                    
                    <div style={{width:"100%"}}>
                        <LangSelector />
                    </div>

                    <div className="TupleParts" style={{width:"100%", display:"flex", flex:"1", flexWrap:"wrap"}}>
                        <div className="StaticPropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} imageHref={tupleData.coverImage}/>
                            <StaticProps isEditMode={this.props.isEditMode} OnCountriesChange={this.OnCountriesChange} OnCatsubChange={this.OnCatsubChange} RegCom={this.RegisterStaticPropsRef} propList={tupleData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField" style={{width:columnWidth, height:columnHeight, border:"1px solid lightgrey", overflow:"auto"}} >
                            <VariableProps isEditMode={this.props.isEditMode} RegCom={this.RegisterVariablePropsRef} language={this.props.language} />
                        </div>
                        <div className="GalleryField" style={{width:columnWidth, border:"1px solid lightgrey", overflow:"auto"}} >
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} images={tupleData.imageGallery} language={this.props.language}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}