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
            i=><VarProp HandleEnterKeyInput={this.props.HandleEnterKeyInput} key={i.id} data={i} language={this.props.language} OnDelete={this.props.OnDelete} OnPropChange={this.props.OnPropChange}/>
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
            <li className="VarProp" onKeyDown={ e => this.props.HandleEnterKeyInput(e, this.props.data.id) }>
                <div className="VarProp_Ru" style={{display:( lang === "ru" ? "initial":"none")}}>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(v, null, this.props.data.id, "ru")}} className="VarProp_Name" style={{width:"40%"}} value={this.props.data.name.ru} floatingLabelText="Свойство"/>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(null, v, this.props.data.id, "ru")}} className="VarProp_Value" style={{width:"40%"}} value={this.props.data.value.ru} floatingLabelText="Значение"/>
                </div>
                <div className="VarProp_En" style={{display:( lang === "en" ? "initial":"none")}}>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(v, null, this.props.data.id, "en")}} className="VarProp_Name" style={{width:"40%"}} value={this.props.data.name.en} floatingLabelText="Свойство"/>
                    <TextField onChange={(e,v)=>{this.props.OnPropChange(null, v, this.props.data.id, "en")}} className="VarProp_Value" style={{width:"40%"}} value={this.props.data.value.en} floatingLabelText="Значение"/>
                </div>
                {/* <IconButton iconStyle={{color:"grey"}}><ActionDelete onClick={()=>{this.props.OnDelete(this.props.data.id)}}/></IconButton> */}
            </li>
        );
    }
}

export default class VariableProps extends React.Component
{
    constructor(props){
        super(props);
        props.RegCom(this);

        // this.AddProp = this.AddProp.bind(this);
        // this.DeleteProp = this.DeleteProp.bind(this);
        this.ChangeProp = this.ChangeProp.bind(this);
        // this.HandleEnterKeyInput = this.HandleEnterKeyInput.bind(this);

        var items = util.DeepCopy(this.props.items);
        if(items || items.length===0)//Если пустой массив то добавляем один итем по дефолту
            items.push({name: {ru: "", en: ""}, value: {ru: "", en: ""}});
        items = items.map((it, ix)=>({...it, id:ix}));//Проставляем всем айдишники
        this.state = {items};

        this.counter = items.length;
        this.focusIndex = this.state.items.length === 0 ? null : 0;
    }

    // AddProp(){
    //     var items = util.DeepCopy(this.state.items);
    //     items.push({name: {ru: "", en: ""}, value: {ru: "", en: ""}, id:this.counter++});
    //     this.setState({items});
    // }

    // DeleteProp(id){
    //     var items = this.state.items.filter(i=>i.id!==id);
    //     this.setState({items: util.DeepCopy(items)});
    // }

    ChangeProp(newName, newValue, id, lang){
        var item = this.state.items.find(i => i.id===id);
        item.name[lang] = newName === null ? item.name[lang] : newName;
        item.value[lang] = newValue === null ? item.value[lang] : newValue;
        this.forceUpdate();
    }

    HandleEnterKeyInput(event, id){
        // if(event.key === "ArrowUp")
        // {
        //     var curIndex = this.state.items.findIndex(i=>i.id===id);
        //     var nextIndex = curIndex - 1 ;
        //     if( curIndex === 0)
        //         return;
            
        //     var items = util.DeepCopy(this.state.items);
        //     var swp = items[curIndex];
        //     items[curIndex] = items[nextIndex];
        //     items[nextIndex] = swp;
        //     this.setState({items});
        //     return;
        // }
        // if(event.key === "ArrowDown")
        // {
        //     var curIndex = this.state.items.findIndex(i=>i.id===id);
        //     var nextIndex = curIndex + 1 ;
        //     if( curIndex === this.state.items.length - 1)
        //         return;
            
        //     var items = util.DeepCopy(this.state.items);
        //     var swp = items[curIndex];
        //     items[curIndex] = items[nextIndex];
        //     items[nextIndex] = swp;
        //     this.setState({items});
        //     return;
        // }
        // if(event.key === "Enter")
        // {
        //     var varProps = event.target.closest(".VariablePropsField");
        //     var itemIndex = this.state.items.findIndex( i => i.id === id);
        //     if( itemIndex === this.state.items.length - 1 )//Если последний то создать новый VarProp элемент
        //     {
        //         this.AddProp();
        //     }
        //     else
        //     {
        //         var queryToInput = `.VarProp_${this.props.language==="ru"?"Ru":"En"} .VarProp_Name input`;
        //         varProps.querySelectorAll(".VarProp")[itemIndex+1].querySelector(queryToInput).focus();
        //     }
        //     // this.focusIndex = itemIndex+1;
        //     return
        // }
    }

    Data() {
        return this.state.items
            .filter(
                i => !(i.name.ru.trim()==="" && i.name.en.trim()==="" && i.value.ru.trim()==="" && i.value.en.trim()==="")//Убрать те, в которых все четыре поля незаполнены
            )
            .map( i => ({name: i.name.ru, value: i.value.ru}));
    }

    Rerender(newItems){
        //HACK-START: FROM CONSTRUCTOR
        var items = util.DeepCopy(newItems);
        if(items || items.length===0)//Если пустой массив то добавляем один итем по дефолту
            items.push({name: {ru: "", en: ""}, value: {ru: "", en: ""}});
        items = items.map((it, ix)=>({...it, id:ix}));//Проставляем всем айдишники
        this.state = {items};

        this.counter = items.length;
        //HACK-END

        this.forceUpdate();
    }

    render(){
        

        return (
            <div className="VariableProps">
                <CardHeader  subtitle="ХАРАКТЕРИСТИКИ" />
                <VariablePropsList
                    items={this.state.items}
                    language={this.props.language}
                    OnPropChange={this.ChangeProp}
                    HandleEnterKeyInput={this.HandleEnterKeyInput}
                />
                {/* <ControlPanel OnClick={this.AddProp} /> */}
            </div>
        );
    }
}