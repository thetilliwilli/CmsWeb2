"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';

import ControlPanel from "./controlPanel.jsx";
import ExhibitList from "./exhibitList.jsx";
import Inst from "../Inst/index.jsx";

class ExhibitOverview extends React.Component
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
            <div className="ExhibitOverview" style={{width:"100%", display:"flex", flexWrap:"wrap"}}>
                <div style={{width:"34%", height:"100%"}} >
                    <Inst />
                </div>
                <div style={{width:"66%", height:"100%"}} >
                    <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
                    <ExhibitList OnDelete={this.props.DeleteExhibit} exhibitList={this.props.model} filter={this.state.filter} filterValue={this.state.filter}/>
                </div>
            </div>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/ac.js";
const S2P = state => ({
    model: state.tagDomain.overview
});
const D2P = dsp => ({
    DeleteExhibit: exhibitId => dsp(ac.DeleteExhibit(exhibitId)),
    FetchOverview: () => dsp(ac.FetchOverview())
});
export default connect(S2P,D2P)(ExhibitOverview);