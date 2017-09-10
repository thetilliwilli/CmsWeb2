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

        postman.Post("exhibit", exhibitData).then(res=>{
                if(res.ok)
                    return res.json();
                else
                    throw new Error(res.statusText);
            })
            .then(json=>{
                if(json.error)
                {
                    console.warn(json.error);
                    dispatch(SubmitNewExhibitResponse(json.error, null));
                }
                else
                {
                    console.log(json.message);
                    dispatch(SubmitNewExhibitResponse(null, json.message));
                }
            })
            .catch(error=>{//Ошибка при соединении с сервером: плохой запрос, нет интернета итд
                console.error(`Попытка запроса на сервер не удалась: ${error}`);
                dispatch(SubmitNewExhibitResponse(error, null));
            });
    };
}

export function SubmitNewExhibitRequest(){
    return {
        type: at.SUBMIT_NEW_EXHIBIT_REQUEST
    }
}

export function SubmitNewExhibitResponse(error, response){
    if(error) return {
            type: at.SUBMIT_NEW_EXHIBIT_RESPONSE,
            payload: error,
            error: true
        }
    else return {
        type: at.SUBMIT_NEW_EXHIBIT_RESPONSE,
        payload: response,
    }
}

export function HideErrorWindow(){
    return { type: at.HIDE_ERROR_WINDOW }
}

export function ShowErrorWindow(error){
    return { type: at.SHOW_ERROR_WINDOW, payload: error }
}
