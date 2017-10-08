"use strict";
import React from "react";
import TupleOverview from "./tupleOverview.jsx";
import Tuple from "./tuple.jsx";


export default class TupleScreen extends React.Component
{

    render(){
        return (
            <div className="TupleScreen" >
                <TupleOverview itemList={this.props.tupleOverview} />
                <Tuple data={this.props.tupleData} />
            </div>
        );
    }
}