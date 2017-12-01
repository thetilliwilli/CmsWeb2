import * as at from "../App/designerAt.js";
import initState from "../App/initState.js";
import util from "../Module/util.js";
import uuid from "uuid/v4";
import CORE from "../App/core.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.designerDomain */
export default function DesignerReducer(state = initState.designerDomain, action){
    switch(action.type)
    {
        case at.DESIGNER_CHANGE_PAGE: return CloneState(state, newState => {  
            newState.page = action.payload;
        });
        case at.CHANGE_DESIGNER_LANGUAGE: return CloneState(state, newState => {
            newState.language = action.payload;
        });

        //DESIGNER CREATE PAGE
        case at.SUBMIT_NEW_DESIGNER_REQUEST: return CloneState(state, newState => {
            newState.designerCreate.result = null;
            newState.errorInformer.error = null;
            newState.designerCreate.blockControl = true;
        });
        case at.SUBMIT_NEW_DESIGNER_RESPONSE: return CloneState(state, newState => {
            newState.designerCreate.blockControl = false;
        });
        case at.CLEAR_CREATE_DESIGNER: return CloneState(state, newState => {
            newState.designerCreate.data = util.DeepCopy(CORE.designer);
            newState.designerCreate.uuid = uuid();//Форсим апдейт вьюхи
        });

        //DESIGNER EDIT PAGE
        case at.SUBMIT_DESIGNER_UPDATE_REQUEST: return CloneState(state, newState => {
            newState.designerEdit.blockControl = true;
        });
        case at.SUBMIT_DESIGNER_UPDATE_RESPONSE: return CloneState(state, newState => {
            newState.designerEdit.blockControl = false;
        });

        //USER FRIENDLY ERROR WINDOW
        case at.HIDE_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.SHOW_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = action.payload;
        });

        //OVERVIEW PAGE
        case at.DESIGNER_OVERVIEW_FETCH_LIST_REQUEST: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.DESIGNER_OVERVIEW_FETCH_LIST_RESPOSE: return CloneState(state, newState => {
            if(action.payload)
            {
                newState.overview = [];
                action.payload.forEach(designer => newState.overview.push({
                    id: designer._id,
                    name: designer.name,
                    coverImage: designer.coverImage
                }));
            }
        });
        case at.DELETE_DESIGNER_FROM_LIST: return CloneState(state, newState => {
            newState.overview = newState.overview.filter(designer => designer.id!==action.payload)
        });

        case at.GET_DESIGNER_RESPONSE: return CloneState(state, newState => {
            newState.designerEdit.blockControl = false;
            if(action.payload)
            {
                newState.designerEdit.data = util.DeepCopy(action.payload);
                newState.designerEdit.template = util.DeepCopy(action.payload);
                newState.designerEdit.uuid = uuid();
            }
        });

        case at.DESIGNER_RESET_EDIT_DATA: return CloneState(state, newState =>{
            newState.designerEdit.data = util.DeepCopy(newState.designerEdit.template);
            newState.designerEdit.uuid = uuid();
        });

        //NAVBAR
        case at.NAVBAR_OPEN: return CloneState(state, newState => {
            newState.isNavbarOpen = true;
        });
        case at.NAVBAR_CLOSE: return CloneState(state, newState => {
            newState.isNavbarOpen = false;
        });

        //CATSUB
        case at.DESIGNER_CATSUB_CHANGE: return CloneState(state, newState => {
            newState[`designer${action.payload.mode}`].data.catsub = action.payload.catsub;
        });
        //CATSUB
        case at.DESIGNER_CHANGE_COUNTRIES: return CloneState(state, newState => {
            newState[`designer${action.payload.mode}`].data.countries = action.payload.countries;
        });

        //DEFAULT    
        default: return state;
    }
}