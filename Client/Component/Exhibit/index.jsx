"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";


import LangSelector from "./langSelector.jsx";
import Avatar from "./avatar.jsx";
import StaticProps from "./staticProps.jsx";
import VariableProps from "./variableProps.jsx";
import ImageGallery from "./imageGallery.jsx";


function ControlPanel(props){
    return (
        <div className="ControlPanel">
            <RaisedButton label="ЗАГРУЗИТЬ В БАЗУ" style={{margin:"10px"}} onClick={props.OnClick}/>
            <RaisedButton label="СОХРАНИТЬ КАК ШАБЛОН" style={{margin:"10px"}}/>
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
        var variableProps = this.VariablePropsRef.Data();
        var avatar = this.AvatarRef.Data();
        var gallery = this.ImageGalleryRef.Data();

        var result = {staticProps, variableProps, avatar, gallery};
        return result;
    }

    Submit(){
        var exhibitData = this.Data();
        console.log(`[Submit new Exhibit]: ${exhibitData.staticProps.ru.name}`);
        this.props.SubmitNewExhibit(exhibitData);
    }

    RegisterStaticPropsRef(component){ this.StaticPropsRef = component;}
    RegisterVariablePropsRef(component){ this.VariablePropsRef = component;}
    RegisterAvatarRef(component){ this.AvatarRef = component;}
    RegisterImageGalleryRef(component){ this.ImageGalleryRef = component;}

    render(){
        return (
            <div className="Exhibit" style={{height:"100%"}}>
                <ControlPanel OnClick={this.Submit}/>
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
            </div>
        );
    }
}

import {connect} from "react-redux";
import {SubmitNewExhibit} from "../../App/ac.js";
export default connect(
    (state)=>{return {
        data: state.draft,
        language: state.exhibitCreator.language,
    }},
    (dispatch)=>{ return {
        SubmitNewExhibit: exhibitData=>dispatch(SubmitNewExhibit(exhibitData))
    }}
)(Exhibit);