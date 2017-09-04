import * as at from "./at";

import initState from "./initState.js";

export default function AppReducer(state = initState, action){
    switch(action.type)
    {
        case at.CHANGE_PAGE:
            return { ...state, ...{navigation:{currentPage: action.payload.index}} };
        case at.CHANGE_EXHIBIT_LANGUAGE:
            return { ...state, ...{exhibitCreator:{language: action.payload.language}} };;
        default: return state;
    }
}