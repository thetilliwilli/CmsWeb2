"use strict";
import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const SuccessLabel = p => <div><span style={{color: "rgb(0, 188, 212)"}}>Success:</span> {p.message}</div>;

class SuccessInformer extends React.Component
{
    render(){
        return (
            <Snackbar
                style={{left:"200px"}}
                open={this.props.open}
                message={<SuccessLabel message={"УДАЧНАЯ ОПЕРАЦИЯ"} />}
                autoHideDuration={1800}
                onRequestClose={this.props.Hide}
            />
        );
    }
}

import {connect} from "react-redux";
import * as ac from "../App/ac.js";
const S2P = state => ({
    open: state.successInformer.open,
    message: state.successInformer.message,
});
const D2P = dsp => ({
    Hide: () => dsp(ac.HideSuccessInformer())
});
export default  connect(S2P,D2P)(SuccessInformer);