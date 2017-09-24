"use strict";
import React from "react";
import Exhibit from "../Exhibit/index.jsx";
import {connect} from "react-redux";
import {SubmitNewExhibit, ShowErrorWindow, ClearCreateExhibit} from "../App/ac.js";

const S2P = state => ({
    data: state.exhibitCreate.data,
    language: state.language,
    uuid: state.exhibitCreate.uuid
});
const D2P = dsp => ({
    Submit: exhibitData=>dsp(SubmitNewExhibit(exhibitData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    Clear: ()=>dsp(ClearCreateExhibit()),
});

export default connect(S2P,D2P)(Exhibit);