"use strict";
import React from "react";

import InstSelector from "./selector.jsx";
import InstEditor from "./editor.jsx";
import ControlPanel from "./cp.jsx";

export default class Inst extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            selected: 0,
            filterValue: "",
        };
        
        this.OnSelect = this.OnSelect.bind(this);
        this.OnFilterChange = this.OnFilterChange.bind(this);
    }

    OnSelect(index){
        this.setState({selected:index});
    }

    OnFilterChange(event, newValue){
        this.setState({filterValue: newValue});
    }

    render(){
        if(this.props.instList.length === 0)
            return <span style={{color:"Chocolate "}}>В системе не зарегистрировано ни одного Устройства</span>;
        return (
            <div style={{width:"100%", display:"flex", flexWrap:"wrap"}} >
                <div className="Inst.ControlPanel.layout" style={{width:"100%"}}>
                    <ControlPanel filterValue={this.state.filterValue} OnChange={this.OnFilterChange} OnRefresh={this.props.InstRefresh} />
                </div>
                <div className="Inst.EditorSelector.layout" style={{width:"100%", display:"flex", flexWrap:"wrap"}}>
                    <div style={{width:"40%", height:"100%", wordBreak:"break-all"}} >
                        <InstSelector
                            OnSelect={this.OnSelect}
                            items={this.props.instList}
                            filterValue={this.state.filterValue}
                        />
                    </div>
                    <div style={{width:"60%", height:"100%"}} >
                        <InstEditor
                            data={this.props.instList[this.state.selected]}
                            InstChange={this.props.InstChange}
                            SubmitUpdate={this.props.SubmitUpdate}
                            SubmitDelete={this.props.SubmitDelete}
                        />
                    </div>
                </div>
                
            </div>
        );
    }
}