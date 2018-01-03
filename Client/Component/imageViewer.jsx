"use strict";
import React from 'react';

import {DEFAULT_IMAGE_AVATAR} from "../Module/consts.js";

class ImageViewer extends React.Component
{
    render(){
        const imageSrc = this.props.imageSrc || DEFAULT_IMAGE_AVATAR;
        return this.props.open === true
            ?
                <div
                    onClick={e=>{e.preventDefault();this.props.ImageViewerHide()}}
                    onContextMenu={e=>{e.preventDefault();this.props.ImageViewerHide()}}
                    style={{position:"fixed", top:"0px", left:"0px", width:"100vw", height:"100vh", display:"flex", backgroundColor:"rgba(0,0,0,0.9)", zIndex:99999}}
                >
                    <img style={{maxWidth:"100%", maxHeight:"100%", margin:"auto"}} src={imageSrc} />
                </div>
            :
                null;
    }
}

ImageViewer.defaultProps = {
    imageSrc: DEFAULT_IMAGE_AVATAR
};

import {connect} from "react-redux";
import {ImageViewerHide} from "../App/ac.js";
const S2P = state => ({
    open: state.imageViewer.open,
    imageSrc: state.imageViewer.imageSrc,
});
const D2P = dsp => ({
    ImageViewerHide: () => dsp(ImageViewerHide())
});
export default connect(S2P, D2P)(ImageViewer);