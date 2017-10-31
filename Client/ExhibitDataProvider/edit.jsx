"use strict";
import React from "react";
import Exhibit from "../Exhibit/index.jsx";
import {connect} from "react-redux";
import {SubmitExhibitUpdate, ShowErrorWindow, SubmitNewExhibit, ResetEditData} from "../App/ac.js";

const S2P = state => ({
    data: state.tagDomain.exhibitEdit.data,
    language: state.tagDomain.language,
    uuid: state.tagDomain.exhibitEdit.uuid,
    isEditMode: true,
    blockControl: state.tagDomain.exhibitEdit.blockControl,
});
const D2P = dsp => ({
    SubmitNewExhibit: exhibitData=>dsp(SubmitNewExhibit(exhibitData)),
    SubmitExhibitUpdate: (exhibitData, id) => dsp(SubmitExhibitUpdate(exhibitData, id)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    ResetEditData: () => dsp(ResetEditData()),
});

export default connect(S2P,D2P)(Exhibit);