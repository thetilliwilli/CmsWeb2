"use strict";
import React from "react";
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete"

import util from "../Module/util.js";
import catsubService from "../Service/catsub.js";


class ControlPanel extends React.Component
{
    render(){
        return (
            <div className="VariableProps_ControlPanel">
                <FloatingActionButton mini onClick={this.props.OnClick}> <ContentAdd /> </FloatingActionButton>
            </div>
        );
    }
}

class VariablePropsList extends React.Component
{
    render(){
        var itemList = this.props.items.map(
            i=><VarProp key={i.id} data={i} language={this.props.language} OnDelete={this.props.OnDelete} OnPropChange={this.props.OnPropChange}/>
        );
        return (
            <ul className="VariablePropsList" style={{listStyle:"none", margin:"20px 20px", padding:"0"}}>
                {itemList}
            </ul>
        );
    }
}

class VarProp extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        const lang = this.props.language;
        return (
            <li className="VarProp" >
                <div className="VarProp_Ru" style={{display:( lang === "ru" ? "initial":"none")}}>
                    <TextField  style={{width:"50%", marginRight:"5%"}} disabled underlineStyle={{opacity:0,cursor:"pointer"}} inputStyle={{color:"black",cursor:"pointer"}} hintStyle={{color:"black",cursor:"pointer"}} onChange={(e,v)=>{this.props.OnPropChange(v, null, this.props.data.id, "ru")}} className="VarProp_Name" value={this.props.data.name.ru} hintText="Свойство" />
                    <TextField  style={{width:"40%"}} onChange={(e,v)=>{this.props.OnPropChange(null, v, this.props.data.id, "ru")}} className="VarProp_Value" value={this.props.data.value.ru} floatingLabelText="Значение"/>
                </div>
                <div className="VarProp_En" style={{display:( lang === "en" ? "initial":"none")}}>
                    <TextField  style={{width:"50%", marginRight:"5%"}} disabled inputStyle={{color:"black"}} hintStyle={{color:"black"}} onChange={(e,v)=>{this.props.OnPropChange(v, null, this.props.data.id, "en")}} className="VarProp_Name" value={this.props.data.name.en} hintText="Свойство"/>
                    <TextField  style={{width:"40%"}} onChange={(e,v)=>{this.props.OnPropChange(null, v, this.props.data.id, "en")}} className="VarProp_Value" value={this.props.data.value.en} floatingLabelText="Значение"/>
                </div>
                {/* <IconButton iconStyle={{color:"grey"}}><ActionDelete onClick={()=>{this.props.OnDelete(this.props.data.id)}}/></IconButton> */}
            </li>
        );
    }
}

class VariableProps extends React.Component
{
    constructor(props){
        super(props);
        props.RegCom(this);

        this.ChangeProp = this.ChangeProp.bind(this);

        var items = util.DeepCopy(this.props.isEditMode ? this.props.propListEdit : this.props.propListCreate);
        // if(items || items.length===0)//Если пустой массив то добавляем один итем по дефолту
        //     items.push({name: {ru: "", en: ""}, value: {ru: "", en: ""}});
        items = items.map((it, ix)=>({...it, id:ix}));//Проставляем всем айдишники
        this.state = {items};

        this.counter = items.length;
        this.focusIndex = this.state.items.length === 0 ? null : 0;
        this.applyExternalUpdate = true;
    }

    componentWillReceiveProps(nextProps){
        const newCatsub = (nextProps.isEditMode ? nextProps.catsubEdit : nextProps.catsubCreate) || "NONE";
        const oldCatsub = (this.props.isEditMode ? this.props.catsubEdit : this.props.catsubCreate) || "NONE";
        if(newCatsub !== oldCatsub)
            this.applyExternalUpdate = true;
    }

    ChangeProp(newName, newValue, id, lang){
        var item = this.state.items.find(i => i.id===id);
        item.name[lang] = newName === null ? item.name[lang] : newName;
        item.value[lang] = newValue === null ? item.value[lang] : newValue;
        this.applyExternalUpdate = false;
        this.forceUpdate();
    }

    Data() {
        return this.state.items
            .filter(
                i => !(i.name.ru.trim()==="" && i.name.en.trim()==="" && i.value.ru.trim()==="" && i.value.en.trim()==="")//Убрать те, в которых все четыре поля незаполнены
            )
            .map( i => ({name: i.name.ru, value: i.value.ru}));
    }

    render(){
        if(this.applyExternalUpdate)
        {
            const fields = this.props.isEditMode ? this.props.propListEdit : this.props.propListCreate;
            const theCatsub = (this.props.isEditMode ? this.props.catsubEdit : this.props.catsubCreate);
            var emptyCatsub = catsubService.Get(theCatsub);
            if(this.props.isEditMode)
                emptyCatsub.forEach( cs => {
                    var y = fields.find(i => i.name === cs.name.ru);
                    var x = y ? y.value : "";
                    cs.value.en = cs.value.ru = x;
                });

            // if(emptyCatsub || emptyCatsub.length===0)//Если пустой массив то добавляем один итем по дефолту
            //     emptyCatsub.push({name: {ru: "", en: ""}, value: {ru: "", en: ""}});
            emptyCatsub = emptyCatsub.map((it, ix)=>({...it, id:ix}));//Проставляем всем айдишники
                
            this.state.items = emptyCatsub;
        }

        return (
            <div className="VariableProps">
                <CardHeader  subtitle="ХАРАКТЕРИСТИКИ" />
                <VariablePropsList
                    items={this.state.items}
                    language={this.props.language}
                    OnPropChange={this.ChangeProp}
                />
            </div>
        );
    }
}

import {connect} from "react-redux";

const S2P = state => ({
    propListCreate: state.designerDomain.designerCreate.data.fields,
    propListEdit: state.designerDomain.designerEdit.data.fields,
    catsubCreate: state.designerDomain.designerCreate.data.catsub,
    catsubEdit: state.designerDomain.designerEdit.data.catsub,
});
const D2P = dsp => ({});
export default connect(S2P, D2P)(VariableProps);