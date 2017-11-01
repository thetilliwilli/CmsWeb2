"use strict";
import React from "react";
import Golo from "../Golo/index.jsx";
import {connect} from "react-redux";
import {SubmitGoloUpdate, ShowErrorWindow, SubmitNewGolo, ResetEditData} from "../App/goloAc.js";

const S2P = state => ({
    data: state.goloDomain.goloEdit.data,
    language: state.goloDomain.language,
    uuid: state.goloDomain.goloEdit.uuid,
    isEditMode: true,
    blockControl: state.goloDomain.goloEdit.blockControl,
});
const D2P = dsp => ({
    SubmitNewGolo: goloData=>dsp(SubmitNewGolo(goloData)),
    SubmitGoloUpdate: (goloData, id) => dsp(SubmitGoloUpdate(goloData, id)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    ResetEditData: () => dsp(ResetEditData()),
});

export default connect(S2P,D2P)(Golo);