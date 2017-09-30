"use strict";
import React from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
//Pages import---------------------------------------------
import ExhibitCreatorPage from "../Page/exhibitCreate.jsx";
import ExhibitOverviewPage from "../Page/exhibitOverview.jsx";
import ExhibitEditPage from "../Page/exhibitEdit.jsx";
import MockupOverviewPage from "../Page/mockupOverview.jsx";

const TagContent = p => (
    <div className="PageSwitcher">
        <div style={{display:( p.curIndex === 0 ? "initial":"none")}}><ExhibitCreatorPage /></div>
        <div style={{display:( p.curIndex === 1 ? "initial":"none")}}><ExhibitOverviewPage /></div>
        <div style={{display:( p.curIndex === 2 ? "initial":"none")}}><ExhibitEditPage /></div>
        <div style={{display:( p.curIndex === 3 ? "initial":"none")}}><MockupOverviewPage /></div>
    </div>
);

const WikiContent = p => (
    <div>WIKI</div>
);

function MainRouting(props){
    let curIndex = props.pageIndex;
    return (
        <Switch>
            <Route path="/tag" component={ () =>  <TagContent curIndex={curIndex}/>} />
            <Route path="/wiki" component={ () =>  <WikiContent curIndex={curIndex}/>} />
            <Redirect to="/tag" />{/* Если не попали ни на одну страницу то перейти на страницу с Электронными этикетками */}
        </Switch>
    );
};

import {connect} from "react-redux";
const S2P = state => ({
    pageIndex: state.tagDomain.page
});
export default withRouter(connect(S2P)(MainRouting));