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
import catsub from "../Service/catsub.js";

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
        this.SubscribeToWindowResize = this.SubscribeToWindowResize.bind(this);
        this.OnCatsubChange = this.OnCatsubChange.bind(this);
        this.OnCountriesChange = this.OnCountriesChange.bind(this);

        this.state = {
            selectedCatsub: this.props.data.catsub.ru.trim() || "NONE",
            selectedCountries: this.props.data.countries.ru || [],
        };
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
            staticProps.countries = this.state.selectedCountries;
            staticProps.catsub = this.state.selectedCatsub;

        var variableProps = this.VariablePropsRef.Data();

        var avatar = this.AvatarRef.Data();
        var coverImageOrUndefined = avatar.src === "/static/img/defaultTupleAvatar.jpg" ? undefined : avatar.src;

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
            staticProps.name = {...dto.name, label:"Название", type:"string"};
            staticProps.catsub = {...dto.catsub, label:"Категория", type:"enum"};
                staticProps.catsub.ru = this.state.selectedCatsub;
            staticProps.countries = {...dto.countries, label:"Страна", type:"set"};
            staticProps.description = {...dto.description, label:"Подробное описание", type:"string"};

        //VARIABLE PROPS ETL
        // var catsubName = dto.catsub.ru.trim() || "NONE";
        var emptyCatsub = catsub.Get(this.state.selectedCatsub);
        if(this.props.isEditMode)
            emptyCatsub.forEach( cs => cs.value.en = cs.value.ru = dto.fields.find(i => i.name === cs.name.ru).value.ru );
        var variableProps = emptyCatsub;

        var imageGallery = dto.imageGallery.map(i => ({src: i.image, id: i.guid, description: i.description}));

        // var imageHref = dto.coverImage;

        return {staticProps, variableProps, imageGallery, coverImage: dto.coverImage};
    }

    OnCatsubChange(newValue){
        if(this.state.selectedCatsub !== newValue)
        {
            //HACK-START: нарушен закон имютебл дата
            this.state.selectedCatsub = newValue;
            //HACK_END
            this.setState({selectedCatsub: newValue});
            this.VariablePropsRef.Rerender(this.ToTupleData(this.props.data).variableProps);
        }
    }

    OnCountriesChange(newValue){
        //HACK-START: danger code - violate immutable principle of state
        this.state.selectedCountries = newValue;
        //HACK-END
    }

    render(){
        const tupleData = this.ToTupleData(this.props.data);
        const columnWidth = (window.innerWidth / window.innerHeight) > 1.0
            ? "33.33%"
            : "100%";
        return (
            <div key={this.props.uuid} className="Tuple" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>

                <div style={{width:"100%", height:"6%"}}>
                    <ControlPanel 
                        handlers={{OnClear: this.props.Clear, OnSubmitNewTuple: this.SubmitNewTuple, OnSubmitTupleUpdate: this.SubmitTupleUpdate}}
                        blockControl={this.props.data.blockControl} isEditMode={this.props.isEditMode}
                    />
                </div>

                <div className="TupleForm" style={{width:"100%", height:"94%", display:"flex", flexWrap:"wrap"}}>
                    
                    <div style={{width:"100%", height:"6%"}}>
                        <LangSelector />
                    </div>

                    <div className="TupleParts" style={{width:"100%", height:"94%", display:"flex", flexWrap:"wrap"}}>
                        <div className="StaticPropsField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey", overflow:"auto"}} >
                            <Avatar RegCom={this.RegisterAvatarRef} imageHref={tupleData.coverImage}/>
                            <StaticProps OnCountriesChange={this.OnCountriesChange} OnCatsubChange={this.OnCatsubChange} RegCom={this.RegisterStaticPropsRef} propList={tupleData.staticProps} language={this.props.language}/>
                        </div>
                        <div className="VariablePropsField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey", overflow:"auto"}} >
                            <VariableProps fakeDependency={this.state.selectedCatsub} RegCom={this.RegisterVariablePropsRef} items={tupleData.variableProps} language={this.props.language} />
                        </div>
                        <div className="GalleryField AdaptiveLayoutColumn" style={{width:columnWidth, height:"100%", border:"1px solid lightgrey"}} >
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} images={tupleData.imageGallery} language={this.props.language}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}