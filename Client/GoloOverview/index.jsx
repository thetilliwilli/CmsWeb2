"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';

import ControlPanel from "./controlPanel.jsx";
import GoloList from "./goloList.jsx";
import InstProvider from "../Inst/provider.jsx";

class GoloOverview extends React.Component
{
    constructor(props){
        super(props);

        this.state = {filter:"", complex:""};
        
        this.OnFilterChange = this.OnFilterChange.bind(this);
        this.OnBadgeSelect = this.OnBadgeSelect.bind(this);
        this.OnChangeComplex = this.OnChangeComplex.bind(this);
    }

    componentWillMount(){
        this.props.FetchOverview();
    }

    OnFilterChange(event, newValue){
        this.setState({filter:newValue});
    }
    OnBadgeSelect(complex){
        this.setState({filter:"?"+(complex?complex:"")});
    }

    OnChangeComplex(complexId){
        this.setState({complex:complexId});
    }

    render(){
        return (
            <div className="GoloOverview" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>
                <div style={{width:"34%", height:"100%", padding: "20px 20px 20px 20px", borderRight:"1px solid lightgrey"}} >
                    <InstProvider OnChangeComplex={this.OnChangeComplex} EditEntity={this.props.EditGolo}/>
                </div>
                <div style={{width:"66%", height:"100%", display:"flex", flexWrap:"wrap", padding: "20px 20px 20px 20px", borderLeft:"1px solid lightgrey"}} >
                    <div style={{width:"100%", height:"10%"}} >
                        <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
                    </div>
                    <div style={{width:"100%", height:"90%", overflow:"auto"}} >
                    <GoloList
                        OnBadgeSelect={this.OnBadgeSelect} OnDelete={this.props.DeleteGolo}
                        goloList={this.props.model} filter={this.state.filter} filterValue={this.state.filter} complex={this.state.complex}
                    />
                    </div>
                </div>
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
    FetchOverview: () => dsp(ac.FetchOverview()),
    EditGolo: (goloId) => dsp(ac.EditGolo(goloId))
});
export default connect(S2P,D2P)(GoloOverview);