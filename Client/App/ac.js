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
            .then(res=>dispatch(SubmitNewExhibitResponse(null, res)), err=>dispatch(SubmitNewExhibitResponse(err, null)));
    };
}

export function SubmitNewExhibitRequest(){
    return {
        type: at.SUBMIT_NEW_EXHIBIT_REQUEST
    }
}

export function SubmitNewExhibitResponse(error, response){
    var action = {type: at.SUBMIT_NEW_EXHIBIT_RESPONSE};
    action.payload = response;
    if(error)
    {
        action.error = true;
        action.payload = new Error(error);
    }
    return action;
}



