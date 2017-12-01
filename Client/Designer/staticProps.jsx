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
            if(propName === "countries" || propName === "catsub")//Пропустить так как эти значения заполняються в Designer.index.jsx в функции Data
                continue;
            result[propName] = this.form.elements["ru." + propName].value;
        }
        return result;
    }

    render(){
        var lang = this.props.language;
        var propList = this.props.propList;
        var itemList = [];
        for(var propName in propList)
            itemList.push(<SProp isEditMode={this.props.isEditMode} OnCountriesChange={this.props.OnCountriesChange} OnCatsubChange={this.props.OnCatsubChange} key={propName} propName={propName} propData={propList[propName]} lang={this.props.language} />);
        
        return (
            <form ref={el=>this.form=el} className="StaticProps" style={{listStyleType: "none"}}>
                <CardHeader  subtitle={`ОБЩИЕ - ${this.props.language==="ru"?"Русский":"Английский"}`} />
                <ul className="StaticPropsList" style={{listStyle:"none", margin:"20px 20px", padding:"0"}}>
                    {itemList}
                </ul>
            </form>
        );
    }
}