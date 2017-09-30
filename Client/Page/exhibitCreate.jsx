"use strict";
import React from "react";
import Exhibit from "../Exhibit/index.jsx";
import {connect} from "react-redux";
import {SubmitNewExhibit, ShowErrorWindow, ClearCreateExhibit} from "../App/ac.js";

const S2P = state => ({
    data: state.tagDomain.exhibitCreate.data,
    language: state.tagDomain.language,
    uuid: state.tagDomain.exhibitCreate.uuid
});
const D2P = dsp => ({
    SubmitNewExhibit: exhibitData=>dsp(SubmitNewExhibit(exhibitData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error)),
    Clear: ()=>dsp(ClearCreateExhibit()),
});

export default connect(S2P,D2P)(Exhibit);