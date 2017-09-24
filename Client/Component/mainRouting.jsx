"use strict";
import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
//Pages import---------------------------------------------
import ExhibitCreatorPage from "./Page/exhibitCreate.jsx";
import ExhibitOverviewPage from "./Page/exhibitOverview.jsx";
import ExhibitEditPage from "./Page/exhibitEdit.jsx";
import MockupOverviewPage from "./Page/mockupOverview.jsx";

function MainRouting(props){
    let curIndex = props.pageIndex;
    return (
        <div className="PageSwitcher">
            <div style={{display:( curIndex === 0 ? "initial":"none")}}><ExhibitCreatorPage /></div>
            <div style={{display:( curIndex === 1 ? "initial":"none")}}><ExhibitOverviewPage /></div>
            <div style={{display:( curIndex === 2 ? "initial":"none")}}><ExhibitEditPage /></div>
            <div style={{display:( curIndex === 3 ? "initial":"none")}}><MockupOverviewPage /></div>
        </div>
    );
};

import {connect} from "react-redux";
export default connect((state)=>{
    return {
        pageIndex: state.page
    };
})(MainRouting);