"use strict";
import React from "react";

import Bureau from "../Bureau/index.jsx";

import {connect} from "react-redux";
const S2P = state => ({
    overview: state.bureauDomain.bureauOverview,
    data: state.bureauDomain.bureau
});
const D2P = dsp => ({

});
export default connect(S2P, D2P)(Bureau);