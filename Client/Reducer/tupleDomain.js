import * as at from "../App/at.js";
import initState from "../App/initState.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.tagDomain */
export default function TupleDomainReducer(state = initState.tupleDomain, action){
    switch(action.type)
    {
        



        default: return state;
    }
}