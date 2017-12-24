"use strict";

import React from "react";

import OverseerPage from "./overseerPage.jsx";

class DataProvider extends React.Component
{
    constructor(props){
        super(props);
        
        this.fetchTimer = null;
    }

    componentWillMount(){
        this.props.FetchOverseer();
    }

    componentDidMount(){
        this.fetchTimer = window.setInterval(this.props.FetchOverseer, 1000);
    }

    componentWillUnmount(){
        if(this.fetchTimer)
            window.clearInterval(this.fetchTimer);
    }

    render(){
        return (
            <OverseerPage data={this.props.overseerData} />
        );
    }
}

import {connect} from "react-redux";
import {FetchOverseer} from "../App/ac.js";
const S2P = state => ({
    overseerData: state.overseer,
});
const D2P = dsp => ({
    FetchOverseer: () => dsp(FetchOverseer()),
});
export default connect(S2P, D2P)(DataProvider);