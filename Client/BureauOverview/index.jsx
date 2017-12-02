"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';

import ControlPanel from "./controlPanel.jsx";
import BureauList from "./bureauList.jsx";
import InstProvider from "../Inst/provider.jsx";

class BureauOverview extends React.Component
{
    constructor(props){
        super(props);

        this.state = {filter:""};
        
        this.OnFilterChange = this.OnFilterChange.bind(this);
    }

    componentWillMount(){
        this.props.FetchOverview();
    }

    OnFilterChange(event, newValue){
        this.setState({filter:newValue});
    }

    render(){
        return (
            <div className="BureauOverview" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>
                <div style={{width:"55%", height:"100%", display:"flex", flexWrap:"wrap", padding: "20px 20px 20px 20px", borderLeft:"1px solid lightgrey"}} >
                    <div style={{width:"100%", height:"10%"}} >
                        <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
                    </div>
                    <div style={{width:"100%", height:"90%", overflow:"auto"}} >
                        <BureauList
                            OnDelete={this.props.DeleteBureau}
                            bureauList={this.props.model} filter={this.state.filter} filterValue={this.state.filter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/bureauAc.js";
const S2P = state => ({
    model: state.bureauDomain.overview
});
const D2P = dsp => ({
    DeleteBureau: bureauId => dsp(ac.DeleteBureau(bureauId)),
    FetchOverview: () => dsp(ac.FetchOverview()),
    EditBureau: (bureauId) => dsp(ac.EditBureau(bureauId))
});
export default connect(S2P,D2P)(BureauOverview);