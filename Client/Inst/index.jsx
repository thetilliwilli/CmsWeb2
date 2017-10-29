"use strict";
import React from "react";

import InstSelector from "./selector.jsx";
import InstEditor from "./editor.jsx";

export default class Inst extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            selected: 0,
        };

        this.OnSelect = this.OnSelect.bind(this);
    }

    OnSelect(index){
        this.setState({selected:index});
    }

    render(){
        if(this.props.instList.length === 0)
            return <span style={{color:"Chocolate "}}>В системе не зарегистрировано ни одного Устройства</span>;
        return (
            <div style={{height:"100%", width:"100%", display:"flex", flexWrap:"wrap"}} >
                <div style={{width:"40%", height:"100%", wordBreak:"break-all"}} >
                    <InstSelector OnSelect={this.OnSelect} items={this.props.instList} />
                </div>
                <div style={{width:"60%", height:"100%"}} >
                    <InstEditor data={this.props.instList[this.state.selected]} OnSave={()=>alert("Saved")} OnDelete={()=>alert("Deleted")}/>
                </div>
            </div>
        );
    }
}