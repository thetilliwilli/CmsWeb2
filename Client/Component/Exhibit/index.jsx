"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";


import LangSelector from "./langSelector.jsx";
import ExhibitAvatar from "./exhibitAvatar.jsx";
import StaticProps from "./staticProps.jsx";
import VariableProps from "./variableProps.jsx";
import ExhibitImageGallery from "./exhibitImageGallery.jsx";


function ControlPanel(props){
    return (
        <div className="ControlPanel">
            <RaisedButton label="Save"/>
            <RaisedButton label="Save as Template"/>
        </div>
    );
}

export default class Exhibit extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Card className="Exhibit">
                <ControlPanel />
                <div className="ExhibitForm">
                    <LangSelector />
                    <div className="ExhibitParts" style={{position:"relative"}}>
                        <Card className="PropsField" style={{width:"50%", height:"100%",  position:"relative"}}>
                            <StaticProps />
                            <VariableProps />
                        </Card>
                        <Card className="AvatarField" style={{width:"50%", height:"50%", left:"50%", position:"relative"}}>
                            <ExhibitAvatar />
                        </Card>
                        <Card className="GalleryField" style={{width:"50%", height:"50%", left:"50%", position:"relative"}}>
                            <ExhibitImageGallery />
                        </Card>
                    </div>
                </div>
            </Card>
        );
    }
}