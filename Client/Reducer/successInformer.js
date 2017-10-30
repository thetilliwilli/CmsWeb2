"use strict";
import util from "../Module/util.js";
import * as at from "../App/at.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

const initState = {
    message:"",
    open:false,
};

/**
 * Reducer for SuccessInformer
 * @param {Array} state
 * @param {*} action
 */
export default function SuccessInformerReducer(state = initState, action){

    switch(action.type){
        case at.SHOW_SUCCESS_INFORMER: return CloneState(state, newState => {
            newState.message = action.payload;
            newState.open = true;
        });
        case at.HIDE_SUCCESS_INFORMER: return CloneState(state, newState => {
            newState.open = false;
        });

        default: return state;
    }
};