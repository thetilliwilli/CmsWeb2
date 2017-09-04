"use strict";
import React from "react";
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Divider from 'material-ui/Divider';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import ActionDelete from "material-ui/svg-icons/action/delete"

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
            <ul className="VariablePropsList" style={{listStyle:"none"}}>
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
            <li className="VarProp">
                <div className="VarProp_Ru" style={{display:( lang === "ru" ? "initial":"none")}}>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(v, null, this.props.data.id, "ru")}} className="VarProp_Name" style={{width:"40%"}} hintText={this.props.data.ru.name||"Свойство"} defaultValue={this.props.data.ru.name}/>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(null, v, this.props.data.id, "ru")}} className="VarProp_Value" style={{width:"40%"}} hintText={this.props.data.ru.value||"Значение"} defaultValue={this.props.data.ru.value}/>
                </div>
                <div className="VarProp_En" style={{display:( lang === "en" ? "initial":"none")}}>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(v, null, this.props.data.id, "en")}} className="VarProp_Name" style={{width:"40%"}} hintText={this.props.data.en.name||"Свойство"} defaultValue={this.props.data.en.name}/>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(null, v, this.props.data.id, "en")}} className="VarProp_Value" style={{width:"40%"}} hintText={this.props.data.en.value||"Значение"} defaultValue={this.props.data.en.value}/>
                </div>
                <IconButton><ActionDelete onClick={()=>{this.props.OnDelete(this.props.data.id)}}/></IconButton>
            </li>
        );
    }
}

export default class VariableProps extends React.Component
{
    constructor(props){
        super(props);

        this.AddProp = this.AddProp.bind(this);
        this.DeleteProp = this.DeleteProp.bind(this);
        this.ChangeProp = this.ChangeProp.bind(this);

        var items = JSON.parse(JSON.stringify(this.props.items));
        if(items || items.length===0)//Если пустой массив то добавляем один итем по дефолту
            items.push({ru:{name:"",value:""},en:{name:"",value:""}});
        items = items.map((it, ix)=>({...it, id:ix}));//Проставляем всем айдишники
        this.state = {items};
        this.counter = items.length;
    }

    AddProp(){
        var items = JSON.parse(JSON.stringify(this.state.items));
        items.push({ru:{name:"",value:""},en:{name:"",value:""}, id:this.counter++});
        this.setState({items});
    }

    DeleteProp(id){
        var items = this.state.items.filter(i=>i.id!==id);
        this.setState({items: JSON.parse(JSON.stringify(items))});
    }

    ChangeProp(newName, newValue, id, lang){
        console.log(newName, newValue, id, lang);
        var item = this.state.items.find(i=>i.id===id)[lang];
        item.name = newName === null ? item.name : newName;
        item.value = newValue === null ? item.value : newValue;
    }

    render(){
        return (
            <div className="VariableProps">
                <CardHeader  subtitle="ХАРАКТЕРИСТИКИ" />
                <ControlPanel OnClick={this.AddProp} />
                <VariablePropsList
                    items={this.state.items}
                    language={this.props.language}
                    OnDelete={this.DeleteProp}
                    OnPropChange={this.ChangeProp} />
            </div>
        );
    }
}