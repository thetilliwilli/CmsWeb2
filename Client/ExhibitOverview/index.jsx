"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';

import ControlPanel from "./controlPanel.jsx";
import ExhibitList from "./exhibitList.jsx";
import InstProvider from "../Inst/provider.jsx";

import util from "../Module/util.js";

class ExhibitOverview extends React.Component
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
        const widths = util.IfLandscape({inst:"45%", itemList:"55%"}, {inst:"100%", itemList:"100%"});
        const rightContentHeights = util.IfLandscape({control:"14%", list:"86%"}, {control:"initial", list:"initial"});
        const LeftContent = <div style={{width:widths.inst, height:"100%", padding: "20px 20px 20px 20px", borderRight:"1px solid lightgrey"}} >
            <InstProvider OnChangeComplex={this.OnChangeComplex} EditEntity={this.props.EditExhibit}/>
        </div>;
        const RightContent = <div style={{width:widths.itemList, height:"100%", display:"flex", flexWrap:"wrap", padding: "20px 20px 20px 20px", borderLeft:"1px solid lightgrey"}} >
            <div style={{width:"100%", height:rightContentHeights.control}} >
                <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
            </div>
            <div style={{width:"100%", height:rightContentHeights.list, overflow:"auto"}} >
                <ExhibitList
                    OnBadgeSelect={this.OnBadgeSelect} OnDelete={this.props.DeleteExhibit}
                    exhibitList={this.props.model} filter={this.state.filter} filterValue={this.state.filter} complex={this.state.complex}
                />
            </div>
        </div>;
        const WholeContent = util.isLandscape
            ? 
                <div className="ExhibitOverview" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>
                    {LeftContent}
                    {RightContent}
                </div>
            :
                <div className="ExhibitOverview" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>
                    <Tabs>
                        <Tab label="Список контента">
                            {RightContent}
                            
                        </Tab>
                        <Tab label="Устройства">
                            {LeftContent}
                        </Tab>
                    </Tabs>
                </div>
            ;
        return WholeContent;
    }
}

import {connect} from "react-redux";
import * as ac from "../App/ac.js";
const S2P = state => ({
    model: state.tagDomain.overview
});
const D2P = dsp => ({
    DeleteExhibit: exhibitId => dsp(ac.DeleteExhibit(exhibitId)),
    FetchOverview: () => dsp(ac.FetchOverview()),
    EditExhibit: (exhibitId) => dsp(ac.EditExhibit(exhibitId))
});
export default connect(S2P,D2P)(ExhibitOverview);