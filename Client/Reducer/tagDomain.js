import * as at from "../App/at.js";
import initState from "../App/initState.js";
import util from "../Module/util.js";
import uuid from "uuid/v4";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.tagDomain */
export default function TagReducer(state = initState.tagDomain, action){
    switch(action.type)
    {
        case at.EXHIBIT_CHANGE_PAGE: return CloneState(state, newState => {  
            newState.page = action.payload;
        });
        case at.CHANGE_EXHIBIT_LANGUAGE: return CloneState(state, newState => {
            newState.language = action.payload;
        });

        //EXHIBIT CREATE PAGE
        case at.SUBMIT_NEW_EXHIBIT_REQUEST: return CloneState(state, newState => {
            newState.exhibitCreate.result = null;
            newState.errorInformer.error = null;
            newState.exhibitCreate.blockControl = true;
        });
        case at.SUBMIT_NEW_EXHIBIT_RESPONSE: return CloneState(state, newState => {
            newState.exhibitCreate.blockControl = false;
            // if(action.payload)
            //     newState.exhibitCreate.result = action.payload;
        });
        case at.CLEAR_CREATE_EXHIBIT: return CloneState(state, newState => {
            newState.exhibitCreate.data = {
                imageGallery: [],
                fields: [],
                name: {ru: "", en: "", label:"Название Экспоната", type:"string"},
                title: {ru: "", en: "", label:"Заголовок Экспоната", type:"string"},
                subtitle: {ru: "", en: "", label:"Подзаголовок Экспоната", type:"string"},
                date: "2017-01-01T00:00:00.000Z",
                location: {ru: "", en: "", label:"Место производство", type:"string"},
                history: {ru: "", en: "", label:"История создания", type:"string"},
                description: {ru: "", en: "", label:"Подробное описание", type:"string"},
                coverImage: "/Static/img/defaultExhibitAvatar.jpg",
                complex: "",
                ordinal: 0,
            };
            newState.exhibitCreate.uuid = uuid();//Форсим апдейт вьюхи
        });

        //EXHIBIT EDIT PAGE
        case at.SUBMIT_EXHIBIT_UPDATE_REQUEST: return CloneState(state, newState => {
            newState.exhibitEdit.blockControl = true;
        });
        case at.SUBMIT_EXHIBIT_UPDATE_RESPONSE: return CloneState(state, newState => {
            newState.exhibitEdit.blockControl = false;
        });
        case at.EXHIBIT_APPLY_CHANGE_COMPLEX: return CloneState(state, newState => {
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
        case at.EXHIBIT_OVERVIEW_FETCH_LIST_REQUEST: return CloneState(state, newState => {
            newState.errorInformer.error = null;
        });
        case at.EXHIBIT_OVERVIEW_FETCH_LIST_RESPOSE: return CloneState(state, newState => {
            if(action.payload)
            {
                newState.overview = [];
                action.payload.forEach(exhibit => newState.overview.push({
                    id: exhibit._id,
                    name: exhibit.name.ru,
                    complex: exhibit.complex,
                    ordinal: exhibit.ordinal,
                }));
            }
        });
        case at.DELETE_EXHIBIT_FROM_LIST: return CloneState(state, newState => {
            newState.overview = newState.overview.filter(exhibit => exhibit.id!==action.payload)
        });

        case at.GET_EXHIBIT_RESPONSE: return CloneState(state, newState => {
            newState.exhibitEdit.blockControl = false;
            if(action.payload)
            {
                newState.exhibitEdit.data = util.DeepCopy(action.payload);
                newState.exhibitEdit.template = util.DeepCopy(action.payload);
                newState.exhibitEdit.uuid = uuid();
            }
        });

        case at.EXHIBIT_RESET_EDIT_DATA: return CloneState(state, newState =>{
            newState.exhibitEdit.data = util.DeepCopy(newState.exhibitEdit.template);
            newState.exhibitEdit.uuid = uuid();
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