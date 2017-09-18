import * as at from "./at.js";
import postman from "../Modules/postmanService.js";


//Helpers--------------------------------------------------------------------------

function _ResponseHandler(postmanResponse, returnedActionType){
    return function(dispatch){
        if(postmanResponse.error)
        {
            console.warn(postmanResponse.error);
            dispatch(ShowErrorWindow(postmanResponse.error));
            dispatch({
                type: returnedActionType,
                error: postmanResponse.error,
            });
        }
        else
        {
            console.log(postmanResponse);
            dispatch({
                type: returnedActionType,
                payload: postmanResponse,
            });
        } 

    };
}

//Action creators------------------------------------------------------------------
export function ChangePage(index){
    return {
        type: at.CHANGE_PAGE,
        payload: {index}
    };
}

export function ChangeExhibitLanguage(lang){
    return {
        type: at.CHANGE_EXHIBIT_LANGUAGE,
        payload: {language: lang}
    }
}

export function SubmitNewExhibit(exhibitData){

    return function(dispatch){
        dispatch(SubmitNewExhibitRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Post("exhibit", SubmitNewExhibitResponse, exhibitData);
    };
}

export function SubmitNewExhibitRequest(){
    return {
        type: at.SUBMIT_NEW_EXHIBIT_REQUEST
    }
}

export function SubmitNewExhibitResponse(response){
    return _ResponseHandler(response, at.SUBMIT_NEW_EXHIBIT_RESPONSE);
}

export function HideErrorWindow(){
    return { type: at.HIDE_ERROR_WINDOW }
}

export function ShowErrorWindow(error){
    return { type: at.SHOW_ERROR_WINDOW, payload: error }
}


export function FetchOverview(){
    return function(dispatch){
        dispatch(FetchOverviewRequest());

        postman.GetAll("exhibit", FetchOverviewResponse);
    }
}

export function FetchOverviewRequest(){
    return {
        type: at.OVERVIEW_FETCH_LIST_REQUEST
    };
}

export function FetchOverviewResponse(response){
    return _ResponseHandler(response, at.OVERVIEW_FETCH_LIST_RESPOSE);
}

export function DeleteExhibit(id){
    return (dispatch) => {
        postman.Delete("exhibit", DeleteExhibitResponse, id);//Отправляем запрос на удаление из базы
    };
}

export function DeleteExhibitResponse(response){
    return _ResponseHandler(response, at.DELETE_EXHIBIT_RESPONSE);
}