import * as at from "../App/at.js";
import initState from "../App/initState.js";
import util from "../Module/util.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.imageViewer */
export default function OverseerReducer(state = initState.imageViewer, action){
    switch(action.type)
    {
        case at.IMAGE_VIEWER_SHOW: return CloneState(state, newState => {
            newState.imageSrc = action.payload;
            newState.open = true;
        });

        case at.IMAGE_VIEWER_HIDE: return CloneState(state, newState => {
            newState.imageSrc = null;
            newState.open = false;
        });

        //DEFAULT    
        default: return state;
    }
}