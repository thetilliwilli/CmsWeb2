"use strict";
import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
//Pages import---------------------------------------------
import ExhibitCreatorPage from "./Page/exhibitCreatorPage.jsx";
import ExhibitOverviewPage from "./Page/exhibitOverviewPage.jsx";
import MockupCreatePage from "./Page/mockupCreatePage.jsx";
import MockupOverviewPage from "./Page/mockupOverviewPage.jsx";

function MainRouting(props){
    let curIndex = props.pageIndex;
    return (
        <div className="PageSwitcher">
            <div style={{display:( curIndex === 0 ? "initial":"none")}}><ExhibitCreatorPage /></div>
            <div style={{display:( curIndex === 1 ? "initial":"none")}}><ExhibitOverviewPage /></div>
            <div style={{display:( curIndex === 2 ? "initial":"none")}}><MockupCreatePage /></div>
            <div style={{display:( curIndex === 3 ? "initial":"none")}}><MockupOverviewPage /></div>
        </div>
    );
};

import {connect} from "react-redux";
export default connect((state)=>{
    return {
        pageIndex: state.navigation.currentPage
    };
})(MainRouting);