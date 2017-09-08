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
                    return res.json();
            })
            .then(json=>dispatch(SubmitNewExhibitResponse(null, json)))
            .catch(json=>dispatch(SubmitNewExhibitResponse(json, null)));
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
        typ: at.SUBMIT_NEW_EXHIBIT_RESPONSE,
        payload: response,
    }
}



