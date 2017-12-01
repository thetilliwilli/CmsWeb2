"use strict";
import React from "react";
import Designer from "../Designer/index.jsx";
import {connect} from "react-redux";
import {SubmitDesignerUpdate, ShowErrorWindow, SubmitNewDesigner, ResetEditData} from "../App/designerAc.js";

const S2P = state => ({
    data: state.designerDomain.designerEdit.data,
    language: state.designerDomain.language,
    uuid: state.designerDomain.designerEdit.uuid,
    isEditMode: true,
    blockControl: state.designerDomain.designerEdit.blockControl,
});
const D2P = dsp => ({
    SubmitNewDesigner: designerData=>dsp(SubmitNewDesigner(designerData)),
    SubmitDesignerUpdate: (designerData, id) => dsp(SubmitDesignerUpdate(designerData, id)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    ResetEditData: () => dsp(ResetEditData()),
});

export default connect(S2P,D2P)(Designer);