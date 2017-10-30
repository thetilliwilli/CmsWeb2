"use strict";
import React from "react";
import Golo from "../Golo/index.jsx";
import {connect} from "react-redux";
import {SubmitNewGolo, ShowErrorWindow, ClearCreateGolo} from "../App/goloAc.js";

const S2P = state => ({
    data: state.goloDomain.goloCreate.data,
    language: state.goloDomain.language,
    uuid: state.goloDomain.goloCreate.uuid,
    blockControl: state.goloDomain.goloCreate.blockControl,
});
const D2P = dsp => ({
    SubmitNewGolo: goloData=>dsp(SubmitNewGolo(goloData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    Clear: ()=>dsp(ClearCreateGolo()),
});

export default connect(S2P,D2P)(Golo);