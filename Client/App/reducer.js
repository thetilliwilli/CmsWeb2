import * as at from "./at";
import initState from "./initState.js";
import util from "../Modules/util.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

export default function AppReducer(state = initState, action){
    switch(action.type)
    {
        case at.CHANGE_PAGE: return CloneState(state, newState => {  
            newState.page = action.payload;
        });
        case at.CHANGE_EXHIBIT_LANGUAGE: return CloneState(state, newState => {
            newState.language = action.payload;
        });

        //NEW EXHIBIT PAGE
        case at.SUBMIT_NEW_EXHIBIT_REQUEST: return CloneState(state, newState => {
            newState.draft.result = null;
            newState.errorInformer.error = null;
            newState.draft.blockControl = true;
        });
        case at.SUBMIT_NEW_EXHIBIT_RESPONSE: return CloneState(state, newState => {
            newState.draft.blockControl = false;
            if(action.payload)
                newState.draft.result = action.payload;
        });

        //USER FRIENDLY ERROR WINDOW
        case at.HIDE_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.SHOW_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = action.payload;
        });

        //OVERVIEW PAGE
        case at.OVERVIEW_FETCH_LIST_REQUEST: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.OVERVIEW_FETCH_LIST_RESPOSE: return CloneState(state, newState => {
            if(action.payload)
            {
                newState.overview = [];
                action.payload.forEach(exhibit => newState.overview.push({
                    id: exhibit._id,
                    name: exhibit.name.ru,
                    coverImage: exhibit.coverImage
                }));
            }
        });
        case at.DELETE_EXHIBIT_FROM_LIST: return CloneState(state, newState => {
            newState.overview = newState.overview.filter(exhibit => exhibit.id!==action.payload)
        });

        case at.GET_EXHIBIT_RESPONSE: return CloneState(state, newState => {
            if(action.payload)
                newState.exhibitEdit = util.DeepCopy(action.payload);
            newState.exhibitEdit.blockControl = false;
        });

        //DEFAULT    
        default: return state;
    }
}