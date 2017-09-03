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
            <div className="Exhibit" style={{height:"100%"}}>
                <ControlPanel />
                <div className="ExhibitForm" style={{height:"100%"}}>
                    <div>
                        <LangSelector/>
                    </div>
                    <div className="ExhibitParts" style={{position:"relative", height:"100%"}}>
                        <Card className="StaticPropsField" style={{width:"30%", height:"100%", float:"left"}}>
                            <StaticProps/>
                        </Card>
                        <Card className="VariablePropsField" style={{width:"30%", height:"100%", float:"left"}}>
                            <VariableProps />
                        </Card>
                        <Card className="AvatarField" style={{width:"40%", float:"left"}}>
                            <ExhibitAvatar />
                        </Card>
                        <Card className="GalleryField" style={{width:"40%", float:"left"}}>
                            <ExhibitImageGallery />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}