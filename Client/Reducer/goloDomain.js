import * as at from "../App/goloAt.js";
import initState from "../App/initState.js";
import util from "../Module/util.js";
import uuid from "uuid/v4";
import CORE from "../App/core.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.goloDomain */
export default function GoloReducer(state = initState.goloDomain, action){
    switch(action.type)
    {
        case at.GOLO_CHANGE_PAGE: return CloneState(state, newState => {  
            newState.page = action.payload;
        });
        case at.CHANGE_GOLO_LANGUAGE: return CloneState(state, newState => {
            newState.language = action.payload;
        });

        //GOLO CREATE PAGE
        case at.SUBMIT_NEW_GOLO_REQUEST: return CloneState(state, newState => {
            newState.goloCreate.result = null;
            newState.errorInformer.error = null;
            newState.goloCreate.blockControl = true;
        });
        case at.SUBMIT_NEW_GOLO_RESPONSE: return CloneState(state, newState => {
            newState.goloCreate.blockControl = false;
        });
        case at.CLEAR_CREATE_GOLO: return CloneState(state, newState => {
            newState.goloCreate.data = util.DeepCopy(CORE.golo);
            newState.goloCreate.uuid = uuid();//Форсим апдейт вьюхи
        });

        //GOLO EDIT PAGE
        case at.SUBMIT_GOLO_UPDATE_REQUEST: return CloneState(state, newState => {
            newState.goloEdit.blockControl = true;
        });
        case at.SUBMIT_GOLO_UPDATE_RESPONSE: return CloneState(state, newState => {
            newState.goloEdit.blockControl = false;
        });
        case at.GOLO_APPLY_CHANGE_COMPLEX: return CloneState(state, newState => {
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
        case at.GOLO_OVERVIEW_FETCH_LIST_REQUEST: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.GOLO_OVERVIEW_FETCH_LIST_RESPOSE: return CloneState(state, newState => {
            if(action.payload)
            {
                newState.overview = [];
                action.payload.forEach(golo => newState.overview.push({
                    id: golo._id,
                    name: golo.name.ru,
                    complex: golo.complex
                }));
            }
        });
        case at.DELETE_GOLO_FROM_LIST: return CloneState(state, newState => {
            newState.overview = newState.overview.filter(golo => golo.id!==action.payload)
        });

        case at.GET_GOLO_RESPONSE: return CloneState(state, newState => {
            newState.goloEdit.blockControl = false;
            if(action.payload)
            {
                newState.goloEdit.data = util.DeepCopy(action.payload);
                newState.goloEdit.template = util.DeepCopy(action.payload);
                newState.goloEdit.uuid = uuid();
            }
        });

        case at.GOLO_RESET_EDIT_DATA: return CloneState(state, newState =>{
            newState.goloEdit.data = util.DeepCopy(newState.goloEdit.template);
            newState.goloEdit.uuid = uuid();
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