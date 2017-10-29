"use strict";
import util from "../Module/util.js";
import uuid from "uuid/v4";
import * as at from "../App/at.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

export default function InstReducer(state = [], action){

    switch(action.type){
        case at.FETCH_INST_RESPONSE: return CloneState(state, newState => {
            Object.assign(newState, action.payload);
        });


        default: return state;
    }
};