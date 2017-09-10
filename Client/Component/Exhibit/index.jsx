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
import ErrorInformer from "./errorInformer.jsx";


function ControlPanel(props){
    return (
        <div className="ControlPanel" style={{position:"relative"}}>{/* Здесь relative для того что бы нормально работал blockerUi*/}
            <RaisedButton label="ЗАГРУЗИТЬ В БАЗУ" style={{margin:"10px"}} onClick={props.OnClick}></RaisedButton>
            <RaisedButton label="СОХРАНИТЬ КАК ШАБЛОН" style={{margin:"10px"}}/>
            {
                props.blockControl &&
                /* убираем доступность кнопок при любом запросе на сервер */
                <div className="blockerUi"
                    style={{position:"absolute", lef:"0", top:"0", width:"100%", height:"100%", backgroundColor:"rgba(255,255,255,0.95)", zIndex:"2", color:"grey", fontSize:"1.75em"}}
                >
                Выполняется операция <CircularProgress size={30} thickness={3} />
                </div>
            }
        </div>
    );
}

class Exhibit extends React.Component
{
    constructor(props){
        super(props);

        window.Exhibit = this;//Экспорт Компонента в глобальную переменную, для удобства разработки

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

    render(){
        return (
            <div className="Exhibit" style={{height:"100%"}}>
                <ControlPanel OnClick={this.Submit} blockControl={this.props.data.blockControl}/>
                <div className="ExhibitForm" style={{height:"100%"}}>
                    <div>
                        <LangSelector/>
                    </div>
                    <div className="ExhibitParts" style={{position:"relative", height:"100%"}}>
                        <Card className="StaticPropsField" style={{width:"30%", height:"100%", float:"left"}}>
                            <StaticProps RegCom={this.RegisterStaticPropsRef} propList={this.props.data.staticProps} language={this.props.language}/>
                        </Card>
                        <Card className="VariablePropsField" style={{width:"30%", height:"100%", float:"left"}}>
                            <VariableProps RegCom={this.RegisterVariablePropsRef} items={this.props.data.variableProps} language={this.props.language} />
                        </Card>
                        <Card className="AvatarField" style={{width:"40%", float:"left"}}>
                            <Avatar RegCom={this.RegisterAvatarRef} />
                        </Card>
                        <Card className="GalleryField" style={{width:"40%", float:"left"}}>
                            <ImageGallery RegCom={this.RegisterImageGalleryRef} />
                        </Card>
                    </div>
                </div>
                <ErrorInformer />
            </div>
        );
    }
}

import {connect} from "react-redux";
import {SubmitNewExhibit, ShowErrorWindow} from "../../App/ac.js";
export default connect(
    (state)=>{return {
        data: state.draft,
        language: state.exhibitCreator.language,
    }},
    (dispatch)=>{ return {
        SubmitNewExhibit: exhibitData=>dispatch(SubmitNewExhibit(exhibitData)),
        ShowErrorWindow: error=>dispatch(ShowErrorWindow(error))
    }}
)(Exhibit);