"use strict";
import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Card} from "material-ui/Card";
import CircularProgress from 'material-ui/CircularProgress';

import ControlPanel from "./controlPanel.jsx";
import ExhibitList from "./exhibitList.jsx";

class ExhibitOverview extends React.Component
{
    constructor(props){
        super(props);

    }


    render(){
        return (
            <div className="ExhibitOverview">
                <ControlPanel />
                <ExhibitList exhibitList={this.props.model.exhibitList}/>
            </div>
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../../App/ac.js";
const S2P = state => ({
    model: state.overview
});
const D2P = dsp => ({
    DeleteExhibit: exhibitId => dsp(ac.DeleteExhibit(exhibitId))
});
export default connect(S2P,D2P)(ExhibitOverview);