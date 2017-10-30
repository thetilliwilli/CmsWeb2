"use strict";
import React from "react";
import Tuple from "../Tuple/index.jsx";
import {connect} from "react-redux";
import {SubmitTupleUpdate, ShowErrorWindow, SubmitNewTuple} from "../App/tupleAc.js";

const S2P = state => ({
    data: state.tupleDomain.tupleEdit.data,
    language: state.tupleDomain.language,
    uuid: state.tupleDomain.tupleEdit.uuid,
    isEditMode: true,
    blockControl: state.tupleDomain.tupleEdit.blockControl,
});
const D2P = dsp => ({
    SubmitNewTuple: tupleData=>dsp(SubmitNewTuple(tupleData)),
    SubmitTupleUpdate: (tupleData, id) => dsp(SubmitTupleUpdate(tupleData, id)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error))
});

export default connect(S2P,D2P)(Tuple);