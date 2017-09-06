"use strict";
import React from "react";
import {Card, CardHeader} from 'material-ui/Card';


import SProp from "./sProp.jsx";

export default class StaticProps extends React.Component
{
    constructor(props){
        super(props);
        props.RegCom(this);
    }

    Data(){
        var result = {ru:{},en:{}};
        var formRu = window.document.querySelector("#staticPropsRu");
        var formEn = window.document.querySelector("#staticPropsEn");

        for(let el in this.props.data.ru)
            result.ru[el] = formRu.elements[el].value;
        for(let el in this.props.data.ru)
            result.en[el] = formEn.elements[el].value;

        return result;
    }

    render(){
        var lang = this.props.language;
        var propList = this.props.propList;
        var itemList = [];
        for(var propName in propList)
            itemList.push(<SProp key={propName} propName={propName} propData={propList[propName]} lang={this.props.language} />);
        return (
            <form className="StaticProps" style={{listStyleType: "none"}}>
                <CardHeader  subtitle={`ОБЩИЕ - ${this.props.language==="ru"?"Русский":"Английский"}`} />
                {itemList}
            </form>
        );
    }
}