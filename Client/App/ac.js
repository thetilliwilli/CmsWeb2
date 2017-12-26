import * as at from "./at.js";
import postman from "../Module/postmanService.js";


//Helpers--------------------------------------------------------------------------

/**
 * Обрабатывает ответ от postman
 * @param {Object} postmanResponse ответный Promise от postman'a
 * @param {Object} returnedActionType какой тип Action'a надо вернуть в reducer
 * @param {Boolean} useSuccessInformer показывать всплывающее окно после успешного выполнения
 * @param {Boolean} useErrorInformer показывать всплывающее окно после провального выполнения
 * */
function _ResponseHandler(postmanResponse, returnedActionType, useSuccessInformer = true, useErrorInformer = true){
    return function(dispatch){
        if(postmanResponse.error)
        {
            console.warn(postmanResponse.error);
            if(useErrorInformer)
                dispatch(ShowErrorWindow(postmanResponse.error));
            dispatch({
                type: returnedActionType,
                error: postmanResponse.error,
            });
        }
        else
        {
            console.log(postmanResponse);
            if(useSuccessInformer)
                dispatch(ShowSuccessInformer(postmanResponse));
            dispatch({
                type: returnedActionType,
                payload: postmanResponse,
            });
        }

    };
}

//Action creators------------------------------------------------------------------
export function ExhibitChangePage(index){
    return {
        type: at.EXHIBIT_CHANGE_PAGE,
        payload: index
    };
}

export function ChangeLanguage(language){
    return {
        type: at.CHANGE_EXHIBIT_LANGUAGE,
        payload: language
    }
}


//EXHIBIT CREATE PAGE----------------------------------------------------------------------
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

export function ClearCreateExhibit(){
    return {type: at.CLEAR_CREATE_EXHIBIT};
}

//ERROR INFORMER----------------------------------------------------------------------
export function HideErrorWindow(){
    return { type: at.HIDE_ERROR_WINDOW }
}

export function ShowErrorWindow(error){
    return { type: at.SHOW_ERROR_WINDOW, payload: error }
}

//OVERVIEW PAGE

export function FetchOverview(){
    return function(dispatch){
        dispatch(FetchOverviewRequest());

        postman.GetAll("exhibit", FetchOverviewResponse);
    }
}

export function FetchOverviewRequest(){
    return {
        type: at.EXHIBIT_OVERVIEW_FETCH_LIST_REQUEST
    };
}

export function FetchOverviewResponse(response){
    return _ResponseHandler(response, at.EXHIBIT_OVERVIEW_FETCH_LIST_RESPOSE);
}

export function DeleteExhibit(id){
    return (dispatch) => {
        postman.Delete("exhibit", null, id);//Отправляем запрос на удаление из базы
        dispatch(DeleteExhibitFromList(id));
    };
}

export function DeleteExhibitFromList(id){
    return {
        type: at.DELETE_EXHIBIT_FROM_LIST,
        payload: id
    };
}

export function DeleteExhibitResponse(response){
    return _ResponseHandler(response, at.DELETE_EXHIBIT_RESPONSE);
}

/** Пользователь хочет открыть страницу с формой для редактирования и загрузить экспонат с указаным id */
export function EditExhibit(exhibitId){
    return (dispatch) => {
        dispatch(GetExhibitRequest(exhibitId));
        dispatch(ExhibitChangePage(2));
    };
}

/** Запрос на сервер чтобы получить полную информацию по выбранному экспонату */
export function GetExhibitRequest(exhibitId){
    return (dispatch) => {
        postman.GetById("exhibit", GetExhibitResponse, exhibitId);
    };
}

/** Ответ от сервера содержащий полную информацию по выбранному экспонату */
export function GetExhibitResponse(response){
    return _ResponseHandler(response, at.GET_EXHIBIT_RESPONSE);
}

export function ExhibitChangeComplex(id, complex){
    return function(dispatch){
        dispatch(ExhibitChangeComplexRequest());

        postman.Put("exhibit", id, {complex}, ExhibitChangeComplexResponse)
            .then(result => result.error ? null : dispatch(ExhibitApplyChangeComplex(id, complex)));
    };
}

    export function ExhibitChangeComplexRequest(){
        return {
            type: at.EXHIBIT_CHANGE_COMPLEX_REQUEST,
        };
    }
    export function ExhibitChangeComplexResponse(response){
        return _ResponseHandler(response, at.EXHIBIT_CHANGE_COMPLEX_RESPONSE);
    }
    export function ExhibitApplyChangeComplex(id, complex){
        return {
            type: at.EXHIBIT_APPLY_CHANGE_COMPLEX,
            payload: {id, complex},
        }
    }

//EDIT PAGE

/** Пользователь внес изменения и хочет обновить экспонат на сервере */
export function SubmitExhibitUpdate(exhibitData, id){

    return function(dispatch){
        dispatch(SubmitExhibitUpdateRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Put("exhibit", id, exhibitData, SubmitExhibitUpdateResponse);
    };
}

export function SubmitExhibitUpdateRequest(){
    return {
        type: at.SUBMIT_EXHIBIT_UPDATE_REQUEST
    }
}

export function SubmitExhibitUpdateResponse(response){
    return _ResponseHandler(response, at.SUBMIT_EXHIBIT_UPDATE_RESPONSE);
}

export function ResetEditData(){
    return {type: at.EXHIBIT_RESET_EDIT_DATA};
}

//NAVBAR
export function NavbarOpen(){
    return {type: at.NAVBAR_OPEN};
}
export function NavbarClose(){
    return {type: at.NAVBAR_CLOSE};
}

//INST
export function FetchInst(){
    return function(dispatch){
        dispatch(FetchInstRequest());

        postman.GetAll("inst", FetchInstResponse);
    }
}

export function FetchInstRequest(){
    return {
        type: at.FETCH_INST_REQUEST
    };
}

    export function FetchInstResponse(response){
        return _ResponseHandler(response, at.FETCH_INST_RESPONSE);
    }

    export function InstChange(data){
        return {
            type: at.INST_CHANGE,
            payload: data
        };
    }

export function InstSubmitUpdate(data){
    return function(dispatch){
        postman.Put("inst", data.id, data, InstSubmitUpdateResponse);
    }
}

    export function InstSubmitUpdateResponse(response){
        return _ResponseHandler(response, at.INST_SUBMIT_UPDATE_RESPONSE);
    }


export function InstSubmitDelete(id){
    return function(dispatch){
        postman.Delete("inst", InstSubmitDeleteResponse, id);
    }
}

    export function InstSubmitDeleteResponse(response){
        return _ResponseHandler(response, at.INST_SUBMIT_DELETE_RESPONSE);
    }

//SuccessInformer
export function ShowSuccessInformer(message){
    return {
        type: at.SHOW_SUCCESS_INFORMER,
        payload: message,
    };
}

    export function HideSuccessInformer(){
        return {
            type: at.HIDE_SUCCESS_INFORMER,
        };
    }

//OVERSEER
export function FetchOverseer(){
    return function(dsp){
        dsp(FetchOverseerRequest());

        postman.Status("inst", FetchOverseerResponse);
    };
}

    export function FetchOverseerRequest(){
        return {type: at.FETCH_OVERSEER_REQUEST};
    }

    export function FetchOverseerResponse(response){
        return _ResponseHandler(response, at.FETCH_OVERSEER_RESPONSE, false, false);
    };