"use strict";
import React from 'react';
import {connect} from "react-redux";

import {ImageViewerShow} from "../App/ac.js";

const D2P = dsp => ({
    ImageViewerShow: function (event, imageSrc){
        event.preventDefault();
        event.stopPropagation();
        dsp(ImageViewerShow(imageSrc));
    },
});

export default function WithImageViewer(WrappedComponent){
    return connect(null, D2P)(WrappedComponent);
}
