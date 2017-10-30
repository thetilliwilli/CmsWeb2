"use strict";
import React from "react";
import Tuple from "../Tuple/index.jsx";
import {connect} from "react-redux";
import {SubmitNewTuple, ShowErrorWindow, ClearCreateTuple, TupleCatsubChange} from "../App/tupleAc.js";

const S2P = state => ({
    data: state.tupleDomain.tupleCreate.data,
    language: state.tupleDomain.language,
    uuid: state.tupleDomain.tupleCreate.uuid,
    blockControl: state.tupleDomain.tupleCreate.blockControl,
});
const D2P = dsp => ({
    SubmitNewTuple: tupleData=>dsp(SubmitNewTuple(tupleData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    Clear: ()=>dsp(ClearCreateTuple()),
    CatsubChange: catsub=>dsp(TupleCatsubChange(catsub)),
});

export default connect(S2P,D2P)(Tuple);