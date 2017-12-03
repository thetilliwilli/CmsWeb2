"use strict";
import React from "react";
import Designer from "../Designer/index.jsx";
import {connect} from "react-redux";
import {SubmitNewDesigner, ShowErrorWindow, ClearCreateDesigner} from "../App/designerAc.js";
import {FetchOverview} from "../App/bureauAc.js";

const S2P = state => ({
    data: state.designerDomain.designerCreate.data,
    language: state.designerDomain.language,
    uuid: state.designerDomain.designerCreate.uuid,
    blockControl: state.designerDomain.designerCreate.blockControl,
    bureauOverview: state.bureauDomain.overview,
});
const D2P = dsp => ({
    SubmitNewDesigner: designerData=>dsp(SubmitNewDesigner(designerData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    Clear: ()=>dsp(ClearCreateDesigner()),
    FetchOverview: () => dsp(FetchOverview()),
});

export default connect(S2P,D2P)(Designer);