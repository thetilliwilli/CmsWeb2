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

        //NEW EXHIBIT PAGE
        case at.SUBMIT_NEW_EXHIBIT_REQUEST:
            var newState = util.DeepCopy(state);
            newState.draft.result = null;
            newState.errorInformer.error = null;
            newState.draft.blockControl = true;
            return newState;
        case at.SUBMIT_NEW_EXHIBIT_RESPONSE:
            var newState = util.DeepCopy(state);
            newState.draft.blockControl = false;
            if(action.payload)
                newState.draft.result = action.payload;
            return newState;

        //USER FRIENDLY ERROR WINDOW
        case at.HIDE_ERROR_WINDOW:
            var newState = util.DeepCopy(state);
            newState.errorInformer.error = null;
            return newState;
        case at.SHOW_ERROR_WINDOW:
            var newState = util.DeepCopy(state);
            newState.errorInformer.error = action.payload;
            return newState;

        //OVERVIEW PAGE
        case at.OVERVIEW_FETCH_LIST_REQUEST:
            var newState = util.DeepCopy(state);
            newState.errorInformer.error = null;
            return newState;
        case at.OVERVIEW_FETCH_LIST_RESPOSE:
            var newState = util.DeepCopy(state);
            if(action.payload)
            {
                newState.overview = [];
                action.payload.forEach(exhibit => newState.overview.push({
                    id: exhibit._id,
                    name: exhibit.name.ru,
                    coverImage: exhibit.coverImage
                }));
            }
            return newState;

        case at.DELETE_EXHIBIT:
            var newState = util.DeepCopy(state);
            newState.overview.filter(exhibit => exhibit.id!==action.payload)
            return newState;

        //DEFAULT    
        default: return state;
    }
}