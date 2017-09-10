"use strict";
import React from "react";
import Dialog from 'material-ui/Dialog';

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
import {HideErrorWindow} from "../../App/ac.js";
const MapStateToProps = (state)=>{
    return {
        error: state.draft.error
    };
};
const MapDispatchToProps = (dispatch)=>{
    return {
        UnblockUi: ()=>{dispatch(HideErrorWindow())}
    };
};
export default connect(MapStateToProps, MapDispatchToProps)(ErrorInformer);