"use strict";
import React from "react";

import Inst from "./index.jsx";
import util from "../Module/util.js";

class Provider extends React.Component
{
    constructor(props){
        super(props);

        this.domain = null;
        this.overview = null;
    }

    componentDidMount(){
        this.domain = util.CurrentDomain();
        this.overview = this.props.appState[`${this.domain}Domain`].overview;
        this.props.FetchData();
    }

    render(){
        return <Inst
            instList={this.props.instList}
            overview={this.overview}
            InstChange={this.props.InstChange}
            SubmitUpdate={this.props.SubmitUpdate}
            SubmitDelete={this.props.SubmitDelete}
            InstRefresh={this.props.FetchData}
        />
    }
            
}

import { connect } from "react-redux";
import {FetchInst, InstChange, InstSubmitUpdate, InstSubmitDelete} from "../App/ac.js";
const S2P = state => ({
    appState: state,
    instList: state.instList
});
const D2P = dsp => ({
    FetchData: () => dsp(FetchInst()),
    InstChange: (data) => dsp(InstChange(data)),
    SubmitUpdate: (data) => dsp(InstSubmitUpdate(data)),
    SubmitDelete: (id) => dsp(InstSubmitDelete(id))
});
export default connect(S2P, D2P)(Provider);

