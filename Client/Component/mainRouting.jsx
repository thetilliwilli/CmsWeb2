"use strict";
import React from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import util from "../Module/util.js";

//Exhibits import---------------------------------------------
import ExhibitCreateDataProvider from "../ExhibitDataProvider/create.jsx";
import ExhibitOverviewDataProvider from "../ExhibitDataProvider/overview.jsx";
import ExhibitEditDataProvider from "../ExhibitDataProvider/edit.jsx";

//Tuples import-------------------------------------------------------
import TupleCreateDataProvider from "../TupleDataProvider/create.jsx";
import TupleOverviewDataProvider from "../TupleDataProvider/overview.jsx";
import TupleEditDataProvider from "../TupleDataProvider/edit.jsx";

//Golos import-------------------------------------------------------
import GoloCreateDataProvider from "../GoloDataProvider/create.jsx";
import GoloOverviewDataProvider from "../GoloDataProvider/overview.jsx";
import GoloEditDataProvider from "../GoloDataProvider/edit.jsx";

//Bureau import-------------------------------------------------------
import BureauDataProvider from "../BureauDataProvider/crud.jsx";


const TagContent = p => (
    <div className="PageSwitcher" style={{height:"100%"}}>
        <div style={{display:( p.curIndex === 0 ? "initial":"none")}}><ExhibitCreateDataProvider /></div>
        <div style={{display:( p.curIndex === 1 ? "initial":"none")}}><ExhibitOverviewDataProvider /></div>
        <div style={{display:( p.curIndex === 2 ? "initial":"none")}}><ExhibitEditDataProvider /></div>
    </div>
);

const TupleContent = p => (
    <div className="PageSwitcher" style={{height:"100%"}}>
        <div style={{display:( p.curIndex === 0 ? "initial":"none")}}><TupleCreateDataProvider /></div>
        <div style={{display:( p.curIndex === 1 ? "initial":"none")}}><TupleOverviewDataProvider /></div>
        <div style={{display:( p.curIndex === 2 ? "initial":"none")}}><TupleEditDataProvider /></div>
    </div>
);

const GoloContent = p => (
    <div className="PageSwitcher" style={{height:"100%"}}>
        <div style={{display:( p.curIndex === 0 ? "initial":"none")}}><GoloCreateDataProvider /></div>
        <div style={{display:( p.curIndex === 1 ? "initial":"none")}}><GoloOverviewDataProvider /></div>
        <div style={{display:( p.curIndex === 2 ? "initial":"none")}}><GoloEditDataProvider /></div>
    </div>
);
const BureauContent = p => (
    <div className="PageSwitcher" style={{height:"100%"}}>
        <div style={{display:( p.curIndex === 0 ? "initial":"none")}}><BureauDataProvider /></div>
        {/* <div style={{display:( p.curIndex === 1 ? "initial":"none")}}><GoloOverviewDataProvider /></div>
        <div style={{display:( p.curIndex === 2 ? "initial":"none")}}><GoloEditDataProvider /></div> */}
    </div>
);

function MainRouting(props){
    let curIndex = props[`${util.CurrentDomain()}PageIndex`];
    return (
        <Switch>
            <Route path="/tag">
                <TagContent curIndex={curIndex}/>
            </Route>
            <Route path="/tuple">
                <TupleContent curIndex={curIndex}/>
            </Route>
            <Route path="/golo">
                <GoloContent curIndex={curIndex}/>
            </Route>
            <Route path="/bureau">
                <BureauContent curIndex={curIndex}/>
            </Route>
            <Redirect to="/tag" />{/* Если не попали ни на одну страницу то перейти на страницу с Электронными этикетками */}
        </Switch>
    );
};

import {connect} from "react-redux";
const S2P = state => ({
    tagPageIndex: state.tagDomain.page,
    tuplePageIndex: state.tupleDomain.page,
    goloPageIndex: state.goloDomain.page,
});
export default withRouter(connect(S2P)(MainRouting));