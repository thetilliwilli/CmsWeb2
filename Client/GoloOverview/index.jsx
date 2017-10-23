"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';

import ControlPanel from "./controlPanel.jsx";
import GoloList from "./goloList.jsx";

class GoloOverview extends React.Component
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
            <div className="GoloOverview">
                <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
                <GoloList OnDelete={this.props.DeleteGolo} goloList={this.props.model} filter={this.state.filter} filterValue={this.state.filter}/>
            </div>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/goloAc.js";
const S2P = state => ({
    model: state.goloDomain.overview
});
const D2P = dsp => ({
    DeleteGolo: goloId => dsp(ac.DeleteGolo(goloId)),
    FetchOverview: () => dsp(ac.FetchOverview())
});
export default connect(S2P,D2P)(GoloOverview);