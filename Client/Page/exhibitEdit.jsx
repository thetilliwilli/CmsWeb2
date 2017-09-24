"use strict";
import React from "react";
import Exhibit from "../Exhibit/index.jsx";
import {connect} from "react-redux";
import {SubmitExhibitUpdate, ShowErrorWindow} from "../App/ac.js";

const S2P = state => ({
    data: state.exhibitEdit.data,
    language: state.language,
    isEditMode: true
});
const D2P = dsp => ({
    Submit: exhibitData=>dsp(SubmitExhibitUpdate(exhibitData)),
    ShowErrorWindow: error=>dsp(ShowErrorWindow(error))
});

export default connect(S2P,D2P)(Exhibit);