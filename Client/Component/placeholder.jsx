"use strict";
import React from "react";

export default class Placeholder extends React.Component
{
    render(){
        return (
            <div style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}} >
                <div style={{ fontSize:"2.5em", color:"lightgrey", margin:"auto", border:"2px dashed lightgrey", borderRadius:"10px", padding:"10px"}}>
                    INTENTIONALLY LEFT BLANK
                </div>
            </div>
        );
    }
}