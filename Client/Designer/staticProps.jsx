"use strict";
import React from "react";
import {Card, CardHeader} from 'material-ui/Card';


import SProp from "./sProp.jsx";
import uuid from "uuid/v4";

export default class StaticProps extends React.Component
{
    constructor(props){
        super(props);
        props.RegCom(this);

        this.form = null;
        this.enumValue = -1;//SUPER DIRTY HACK

        this.EnumChange = this.EnumChange.bind(this);//SUPER DIRTY HACK
    }

    //SUPER DIRTY HACK
    EnumChange(newValue){
        this.enumValue = newValue;
    }

    Data(){
        var result = {};
        for(var propName in this.props.propList)
        {
            result[propName] = {
                ru: (this.props.propList[propName].type === "enum" ? this.enumValue : this.form.elements["ru." + propName].value),
                en: (this.props.propList[propName].type === "enum" ? this.enumValue : this.form.elements["en." + propName].value),
            };
        }
        return result;
    }

    render(){
        var lang = this.props.language;
        var propList = this.props.propList;
        var itemList = [];
        for(var propName in propList)
            itemList.push(<SProp key={propName} uuid={uuid()} propName={propName} propData={propList[propName]} lang={this.props.language} bureauEnum={this.props.bureauEnum} OnEnumChange={this.EnumChange} />);
        
        return (
            <form ref={el=>this.form=el} className="StaticProps Designer" style={{listStyleType: "none"}}>
                <CardHeader  subtitle={`ОБЩИЕ - ${this.props.language==="ru"?"Русский":"Английский"}`} />
                <ul className="StaticPropsList" style={{listStyle:"none", margin:"0 20px 0 20px", padding:"0"}}>
                    {itemList}
                </ul>
            </form>
        );
    }
}