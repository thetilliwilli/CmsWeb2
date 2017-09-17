import * as at from "./at.js";
import postman from "../Modules/postmanService.js";

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

        postman.Post("exhibit", exhibitData)
            .then(json => {
                dispatch(SubmitNewExhibitResponse(json));
            })
            .catch(error=>{//Ошибка при соединении с сервером: плохой запрос, нет интернета итд
                console.error(`Попытка запроса на сервер не удалась: ${error}`);
                dispatch(SubmitNewExhibitResponse({error}));
            });
    };
}

export function SubmitNewExhibitRequest(){
    return {
        type: at.SUBMIT_NEW_EXHIBIT_REQUEST
    }
}

export function SubmitNewExhibitResponse(response){
    if(response.error)
    {
        console.warn(response.error);
        return {
            type: at.SUBMIT_NEW_EXHIBIT_RESPONSE,
            payload: response.error,
            error: true
        }
    }
    else
    {
        console.log(response.message);
        return {
            type: at.SUBMIT_NEW_EXHIBIT_RESPONSE,
            payload: response.message,
        }
    } 
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

        postman.GetAll("exhibit")
            .then(json => {
                dispatch(FetchOverviewResponse(json))
            })
            .catch(error => {
                dispatch(FetchOverviewResponse({error}))
            })
    }
}

export function FetchOverviewRequest(){
    return {
        type: at.OVERVIEW_FETCH_LIST_REQUEST
    };
}

export function FetchOverviewResponse(response){
    if(response.error)
    {
        console.warn(response.error);
        return {
            type: at.OVERVIEW_FETCH_LIST_RESPOSE,
            payload: response.error,
            error: true
        }
    }
    else
    {
        console.log(response.message);
        return {
            type: at.OVERVIEW_FETCH_LIST_RESPOSE,
            payload: response,
        }
    } 
}