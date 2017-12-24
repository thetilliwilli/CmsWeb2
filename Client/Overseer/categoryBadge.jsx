"use strict";
import React from "react";

const okCountStyle = {
    color: "LimeGreen",
    fontSize:"2em"
};

const poorCountStyle = {
    color: "DarkOrange",
    fontSize:"2em"
};

const alertCountStyle = {
    color: "crimson",
    fontSize:"2em"
};

const totalCountStyle = {
    color: "lightslategrey",
    fontSize:"2em"
};


export default class CategoryBadge extends React.Component
{
    render(){
        return (
            <div
                className="CategoryBadge"
                style={{display:"flex", flexWrap:"wrap"}}
                onClick={()=>this.props.SetDetailView(this.props.type)}
            >
                <div style={{display:"flex", flexWrap:"wrap", margin:"auto"}}>
                    
                    <div className="CategoryBadgeTitle" >
                        {this.props.type.trim().toUpperCase()}
                    </div>

                    <div>
                        <span style={okCountStyle} >{this.props.okCount}</span>
                        <span style={totalCountStyle} >/</span>
                        <span style={poorCountStyle} >{this.props.poorCount}</span>
                        <span style={totalCountStyle} >/</span>
                        <span style={alertCountStyle} >{this.props.alertCount}</span>
                    </div>

                </div>
            </div>
        );
    }
}