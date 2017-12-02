import * as at from "../App/bureauAt.js";
import initState from "../App/initStateBureau.js";
import util from "../Module/util.js";
import uuid from "uuid/v4";
import CORE from "../App/core.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.bureauDomain */
export default function BureauReducer(state = initState.bureauDomain, action){
    switch(action.type)
    {
        case at.BUREAU_CHANGE_PAGE: return CloneState(state, newState => {  
            newState.page = action.payload;
        });
        case at.CHANGE_BUREAU_LANGUAGE: return CloneState(state, newState => {
            newState.language = action.payload;
        });

        //BUREAU CREATE PAGE
        case at.SUBMIT_NEW_BUREAU_REQUEST: return CloneState(state, newState => {
            newState.bureauCreate.result = null;
            newState.errorInformer.error = null;
            newState.bureauCreate.blockControl = true;
        });
        case at.SUBMIT_NEW_BUREAU_RESPONSE: return CloneState(state, newState => {
            newState.bureauCreate.blockControl = false;
        });
        case at.CLEAR_CREATE_BUREAU: return CloneState(state, newState => {
            newState.bureauCreate.data = util.DeepCopy(CORE.bureau);
            newState.bureauCreate.uuid = uuid();//Форсим апдейт вьюхи
        });

        //BUREAU EDIT PAGE
        case at.SUBMIT_BUREAU_UPDATE_REQUEST: return CloneState(state, newState => {
            newState.bureauEdit.blockControl = true;
        });
        case at.SUBMIT_BUREAU_UPDATE_RESPONSE: return CloneState(state, newState => {
            newState.bureauEdit.blockControl = false;
        });
        case at.BUREAU_APPLY_CHANGE_COMPLEX: return CloneState(state, newState => {
            newState.overview.find(i => i.id===action.payload.id).complex = action.payload.complex;
        });

        //USER FRIENDLY ERROR WINDOW
        case at.HIDE_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.SHOW_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = action.payload;
        });

        //OVERVIEW PAGE
        case at.BUREAU_OVERVIEW_FETCH_LIST_REQUEST: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.BUREAU_OVERVIEW_FETCH_LIST_RESPOSE: return CloneState(state, newState => {
            if(action.payload)
            {
                newState.overview = [];
                action.payload.forEach(bureau => newState.overview.push({
                    id: bureau._id,
                    name: bureau.name.ru,
                    complex: bureau.complex,
                    ordinal: bureau.ordinal,
                }));
            }
        });
        case at.DELETE_BUREAU_FROM_LIST: return CloneState(state, newState => {
            newState.overview = newState.overview.filter(bureau => bureau.id!==action.payload)
        });

        case at.GET_BUREAU_RESPONSE: return CloneState(state, newState => {
            newState.bureauEdit.blockControl = false;
            if(action.payload)
            {
                newState.bureauEdit.data = util.DeepCopy(action.payload);
                newState.bureauEdit.template = util.DeepCopy(action.payload);
                newState.bureauEdit.uuid = uuid();
            }
        });

        case at.BUREAU_RESET_EDIT_DATA: return CloneState(state, newState =>{
            newState.bureauEdit.data = util.DeepCopy(newState.bureauEdit.template);
            newState.bureauEdit.uuid = uuid();
        });

        //NAVBAR
        case at.NAVBAR_OPEN: return CloneState(state, newState => {
            newState.isNavbarOpen = true;
        });
        case at.NAVBAR_CLOSE: return CloneState(state, newState => {
            newState.isNavbarOpen = false;
        });

        //DEFAULT    
        default: return state;
    }
}