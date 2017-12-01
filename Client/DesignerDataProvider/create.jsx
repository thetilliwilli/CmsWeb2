"use strict";
import React from "react";
import Designer from "../Designer/index.jsx";
import {connect} from "react-redux";
import {SubmitNewDesigner, ShowErrorWindow, ClearCreateDesigner, DesignerCatsubChange} from "../App/designerAc.js";

const S2P = state => ({
    data: state.designerDomain.designerCreate.data,
    language: state.designerDomain.language,
    uuid: state.designerDomain.designerCreate.uuid,
    blockControl: state.designerDomain.designerCreate.blockControl,
});
const D2P = dsp => ({
    SubmitNewDesigner: designerData=>dsp(SubmitNewDesigner(designerData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    Clear: ()=>dsp(ClearCreateDesigner()),
    CatsubChange: catsub=>dsp(DesignerCatsubChange(catsub)),
});

export default connect(S2P,D2P)(Designer);