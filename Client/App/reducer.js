import * as at from "./at";
import initState from "./initState.js";
import util from "../Modules/util.js";

export default function AppReducer(state = initState, action){
    switch(action.type)
    {
        case at.CHANGE_PAGE:
            return { ...state, ...{navigation:{currentPage: action.payload.index}} };
        case at.CHANGE_EXHIBIT_LANGUAGE:
            return { ...state, ...{exhibitCreator:{language: action.payload.language}} };
        case at.SUBMIT_NEW_EXHIBIT_REQUEST:
            var newState = util.deepCopy(state);
            newState.draft.result = null;
            newState.draft.error = null;
            newState.draft.blockControl = true;
            return newState;
        case at.SUBMIT_NEW_EXHIBIT_RESPONSE:
            var newState = util.deepCopy(state);
            if(action.error)
                newState.draft.error = action.payload;
            else
                newState.draft.result = action.payload;
            newState.draft.blockControl = false;
            return newState;


        default: return state;
    }
}