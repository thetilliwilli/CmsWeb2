import * as at from "../App/tupleAt.js";
import initState from "../App/initState.js";
import util from "../Module/util.js";
import uuid from "uuid/v4";
import CORE from "../App/core.js";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.tupleDomain */
export default function TupleReducer(state = initState.tupleDomain, action){
    switch(action.type)
    {
        case at.TUPLE_CHANGE_PAGE: return CloneState(state, newState => {  
            newState.page = action.payload;
        });
        case at.CHANGE_TUPLE_LANGUAGE: return CloneState(state, newState => {
            newState.language = action.payload;
        });

        //TUPLE CREATE PAGE
        case at.SUBMIT_NEW_TUPLE_REQUEST: return CloneState(state, newState => {
            newState.tupleCreate.result = null;
            newState.errorInformer.error = null;
            newState.tupleCreate.blockControl = true;
        });
        case at.SUBMIT_NEW_TUPLE_RESPONSE: return CloneState(state, newState => {
            newState.tupleCreate.blockControl = false;
        });
        case at.CLEAR_CREATE_TUPLE: return CloneState(state, newState => {
            newState.tupleCreate.data = util.DeepCopy(CORE.tuple);
            newState.tupleCreate.uuid = uuid();//Форсим апдейт вьюхи
        });

        //TUPLE EDIT PAGE
        case at.SUBMIT_TUPLE_UPDATE_REQUEST: return CloneState(state, newState => {
            newState.tupleEdit.blockControl = true;
        });
        case at.SUBMIT_TUPLE_UPDATE_RESPONSE: return CloneState(state, newState => {
            newState.tupleEdit.blockControl = false;
        });

        //USER FRIENDLY ERROR WINDOW
        case at.HIDE_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.SHOW_ERROR_WINDOW: return CloneState(state, newState => {
            newState.errorInformer.error = action.payload;
        });

        //OVERVIEW PAGE
        case at.TUPLE_OVERVIEW_FETCH_LIST_REQUEST: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.TUPLE_OVERVIEW_FETCH_LIST_RESPOSE: return CloneState(state, newState => {
            if(action.payload)
            {
                newState.overview = [];
                action.payload.forEach(tuple => newState.overview.push({
                    id: tuple._id,
                    name: tuple.name,
                    coverImage: tuple.coverImage
                }));
            }
        });
        case at.DELETE_TUPLE_FROM_LIST: return CloneState(state, newState => {
            newState.overview = newState.overview.filter(tuple => tuple.id!==action.payload)
        });

        case at.GET_TUPLE_RESPONSE: return CloneState(state, newState => {
            newState.tupleEdit.blockControl = false;
            if(action.payload)
            {
                newState.tupleEdit.data = util.DeepCopy(action.payload);
                newState.tupleEdit.template = util.DeepCopy(action.payload);
                newState.tupleEdit.uuid = uuid();
            }
        });

        case at.TUPLE_RESET_EDIT_DATA: return CloneState(state, newState =>{
            newState.tupleEdit.data = util.DeepCopy(newState.tupleEdit.template);
            newState.tupleEdit.uuid = uuid();
        });

        //NAVBAR
        case at.NAVBAR_OPEN: return CloneState(state, newState => {
            newState.isNavbarOpen = true;
        });
        case at.NAVBAR_CLOSE: return CloneState(state, newState => {
            newState.isNavbarOpen = false;
        });

        //CATSUB
        case at.TUPLE_CATSUB_CHANGE: return CloneState(state, newState => {
            newState[`tuple${action.payload.mode}`].data.catsub = action.payload.catsub;
        });
        //CATSUB
        case at.TUPLE_CHANGE_COUNTRIES: return CloneState(state, newState => {
            newState[`tuple${action.payload.mode}`].data.countries = action.payload.countries;
        });

        //DEFAULT    
        default: return state;
    }
}