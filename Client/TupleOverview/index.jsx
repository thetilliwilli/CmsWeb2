"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';

import ControlPanel from "./controlPanel.jsx";
import TupleList from "./tupleList.jsx";

class TupleOverview extends React.Component
{
    constructor(props){
        super(props);

        this.state = {filter:""};
        
        this.OnFilterChange = this.OnFilterChange.bind(this);
    }

    componentWillMount(){
        this.props.FetchOverview();
    }

    OnFilterChange(event){
        this.setState({filter:event.target.value});
    }

    render(){
        return (
            <div className="TupleOverview">
                <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
                <TupleList OnDelete={this.props.DeleteTuple} tupleList={this.props.model} filter={this.state.filter} filterValue={this.state.filter}/>
            </div>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/tupleAc.js";
const S2P = state => ({
    model: state.tupleDomain.overview
});
const D2P = dsp => ({
    DeleteTuple: tupleId => dsp(ac.DeleteTuple(tupleId)),
    FetchOverview: () => dsp(ac.FetchOverview())
});
export default connect(S2P,D2P)(TupleOverview);