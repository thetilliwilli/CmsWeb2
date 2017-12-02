"use strict";
import React from "react";
import Bureau from "../Bureau/index.jsx";
import {connect} from "react-redux";
import {SubmitBureauUpdate, ShowErrorWindow, SubmitNewBureau, ResetEditData} from "../App/bureauAc.js";

const S2P = state => ({
    data: state.bureauDomain.bureauEdit.data,
    language: state.bureauDomain.language,
    uuid: state.bureauDomain.bureauEdit.uuid,
    isEditMode: true,
    blockControl: state.bureauDomain.bureauEdit.blockControl,
});
const D2P = dsp => ({
    SubmitNewBureau: bureauData=>dsp(SubmitNewBureau(bureauData)),
    SubmitBureauUpdate: (bureauData, id) => dsp(SubmitBureauUpdate(bureauData, id)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    ResetEditData: () => dsp(ResetEditData()),
});

export default connect(S2P,D2P)(Bureau);