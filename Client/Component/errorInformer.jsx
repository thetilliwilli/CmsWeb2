"use strict";
import React from "react";
import Dialog from 'material-ui/Dialog';


const customContentStyle = {
    width: '94%',
    maxWidth: 'none',
  };
  
class ErrorInformer extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        if(!this.props.error) return null;//Быстрый выход ничего отрисовывать ненадо
        return (
            <Dialog title="Ошибки в форме"
            modal={false} open={this.props.error !== null}
            onRequestClose={this.props.UnblockUi}
            titleStyle={{color:"crimson"}}
            contentStyle={customContentStyle}
            >
                <pre>{ErrorToMessage(this.props.error)}</pre>
            </Dialog>
        );
    }
}

function ErrorToMessage(error){
    if(error.message)
        return error.message;
    if(error.errmsg)
        return error.errmsg;
    return `Неизвестный тип ошибки: ${JSON.stringify(error)}`;
}

import {connect} from "react-redux";
import {HideErrorWindow} from "../App/ac.js";
const S2P = state => ({
    error: state.tagDomain.errorInformer.error
});
const D2P = dsp => ({
    UnblockUi: ()=>{dsp(HideErrorWindow())}
});
export default connect(S2P, D2P)(ErrorInformer);