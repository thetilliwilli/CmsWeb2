"use strict";
import React from "react";

import {connect} from "react-redux"
import Tuple from "../Tuple/index.jsx";

const S2P = state => ({
    tupleOverview: state.tupleDomain.overview,
    tupleData: state.tupleDomain.data,
});
const D2P = dsp => ({

});
export default connect(S2P, D2P)(Tuple);