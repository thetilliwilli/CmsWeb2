"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';

import ControlPanel from "./controlPanel.jsx";
import DesignerList from "./designerList.jsx";
import InstProvider from "../Inst/provider.jsx";

class DesignerOverview extends React.Component
{
    constructor(props){
        super(props);

        this.state = {filter:"", bureau:""};
        
        this.OnFilterChange = this.OnFilterChange.bind(this);
        this.OnBadgeSelect = this.OnBadgeSelect.bind(this);
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

    render(){
        return (
            <div className="DesignerOverview" style={{width:"100%", height:"100%", display:"flex", flexWrap:"wrap"}}>
                <div style={{width:"55%", height:"100%", display:"flex", flexWrap:"wrap", padding: "20px 20px 20px 20px", borderLeft:"1px solid lightgrey"}} >
                    <div style={{width:"100%", height:"10%"}} >
                        <ControlPanel OnChange={this.OnFilterChange} filterValue={this.state.filter} OnRefresh={this.props.FetchOverview}/>
                    </div>
                    <div style={{width:"100%", height:"90%", overflow:"auto"}} >
                        <DesignerList
                            OnBadgeSelect={this.OnBadgeSelect}
                            OnDelete={this.props.DeleteDesigner}
                            designerList={this.props.model} filter={this.state.filter} filterValue={this.state.filter}
                            bureau={this.state.bureau}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/designerAc.js";
const S2P = state => ({
    model: state.designerDomain.overview
});
const D2P = dsp => ({
    DeleteDesigner: designerId => dsp(ac.DeleteDesigner(designerId)),
    FetchOverview: () => dsp(ac.FetchOverview()),
    EditDesigner: (designerId) => dsp(ac.EditDesigner(designerId))
});
export default connect(S2P,D2P)(DesignerOverview);