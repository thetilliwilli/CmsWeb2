"use strict";
import React from "react";

import InstSelector from "./selector.jsx";
import InstEditor from "./editor.jsx";
import ControlPanel from "./cp.jsx";
import {List, ListItem} from 'material-ui/List';


import util from "../Module/util.js";

const Warning = (props) => <span style={{color:"Chocolate "}}>{"\u2b05"} {props.message || ""}</span>;

export default class Inst extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            selectedInstId: null,
            filterValue: "",
        };
        
        this.OnSelect = this.OnSelect.bind(this);
        this.OnFilterChange = this.OnFilterChange.bind(this);
    }

    OnSelect(instId){
        this.setState({selectedInstId:instId});
        //Передаем значение витрины (complex) в текущем выбранном устройстве
        this.props.OnChangeComplex(this.props.instList.find(i => i.id === instId).complex);
    }

    OnFilterChange(event, newValue){
        this.setState({filterValue: newValue});
    }

    render(){
        const typeFilter = this.props.domain === "tag"
            ? "exhibit"
            : this.props.domain;
        const theInst = this.props.instList.find(i => i.id === this.state.selectedInstId);
        const heights = util.IfLandscape({control:"14%", list:"86%"}, {control:"initial", list:"initial"});
        return (
            <div style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}} >
                <div className="Inst.ControlPanel.layout" style={{width:"100%", height:heights.control}}>
                    <ControlPanel filterValue={this.state.filterValue} OnChange={this.OnFilterChange} OnRefresh={this.props.InstRefresh} />
                </div>
                {
                    this.props.instList.filter(ex => ex.type ? ex.type === typeFilter : false).length === 0
                        ? <Warning message="В системе не зарегистрировано ни одного Устройства"/>
                        :
                            <div className="Inst.EditorSelector.layout" style={{width:"100%", height:heights.list, display:"flex", flexWrap:"wrap"}}>
                                <div style={{width:"40%", height:"100%", wordBreak:"break-all", overflow:"auto", paddingTop:"8px"}} >
                                    <InstSelector
                                        OnSelect={this.OnSelect}
                                        items={this.props.instList}
                                        filterValue={this.state.filterValue}
                                        domain={this.props.domain}
                                        selectedInstId={this.state.selectedInstId}
                                    />
                                </div>
                                <div style={{width:"60%", height:"100%", paddingTop:"8px"}} >
                                    {
                                        theInst
                                            ?
                                                <InstEditor
                                                    data={this.props.instList.find(i => i.id === this.state.selectedInstId) || {}}
                                                    InstChange={this.props.InstChange}
                                                    SubmitUpdate={this.props.SubmitUpdate}
                                                    SubmitDelete={this.props.SubmitDelete}
                                                    EditEntity={this.props.EditEntity}
                                                />
                                            : <List><ListItem primaryText={<Warning message="Выберите устройство"/>} disabled /></List>
                                    }
                                </div>
                            </div>
                }
                
            </div>
        );
    }
}