"use strict";
import React from "react";
import Bureau from "../Bureau/index.jsx";
import {connect} from "react-redux";
import {SubmitNewBureau, ShowErrorWindow, ClearCreateBureau} from "../App/bureauAc.js";

const S2P = state => ({
    data: state.bureauDomain.bureauCreate.data,
    language: state.bureauDomain.language,
    uuid: state.bureauDomain.bureauCreate.uuid,
    blockControl: state.bureauDomain.bureauCreate.blockControl,
});
const D2P = dsp => ({
    SubmitNewBureau: bureauData=>dsp(SubmitNewBureau(bureauData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    Clear: ()=>dsp(ClearCreateBureau()),
});

export default connect(S2P,D2P)(Bureau);