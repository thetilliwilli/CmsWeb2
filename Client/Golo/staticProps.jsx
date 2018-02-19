"use strict";
import React from "react";
import {Card, CardHeader} from 'material-ui/Card';


import SProp from "./sProp.jsx";

export default class StaticProps extends React.Component
{
    constructor(props){
        super(props);
        props.RegCom(this);

        this.form = null;
    }

    Data(){
        var result = {};
        for(var propName in this.props.propList)
        {
            result[propName] = {
                ru: (this.props.propList[propName].type === Date ? new Date(this.form.elements["ru." + propName].value) : this.form.elements["ru." + propName].value),
                en: (this.props.propList[propName].type === Date ? new Date(this.form.elements["en." + propName].value) : this.form.elements["en." + propName].value),
            };
        }
        return result;
    }

    render(){
        var lang = this.props.language;
        var propList = this.props.propList;
        var itemList = [];
        for(var propName in propList)
            itemList.push(<SProp key={propName} propName={propName} propData={propList[propName]} lang={this.props.language} />);
        
        return (
            <form ref={el=>this.form=el} className="StaticProps" style={{listStyleType: "none"}}>
                <CardHeader style={{padding:"0 16px 0 16px"}} subtitle={`ОБЩИЕ - ${this.props.language==="ru"?"Русский":"Английский"}`} />
                <ul className="StaticPropsList" style={{listStyle:"none", margin:"0px 20px 20px 20px", padding:"0"}}>
                    {itemList}
                </ul>
            </form>
        );
    }
}