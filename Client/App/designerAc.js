import * as at from "./designerAt.js";
import postman from "../Module/postmanService.js";


//Helpers--------------------------------------------------------------------------

/**
 * Обрабатывает ответ от postman
 * @param {Object} postmanResponse ответный Promise от postman'a
 * @param {Object} returnedActionType какой тип Action'a надо вернуть в reducer
 * */
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
            dispatch(ShowSuccessInformer(postmanResponse));
            dispatch({
                type: returnedActionType,
                payload: postmanResponse,
            });
        }

    };
}

//Action creators------------------------------------------------------------------
export function DesignerChangePage(index){
    return {
        type: at.DESIGNER_CHANGE_PAGE,
        payload: index
    };
}

export function ChangeLanguage(language){
    return {
        type: at.CHANGE_DESIGNER_LANGUAGE,
        payload: language
    }
}


//DESIGNER CREATE PAGE----------------------------------------------------------------------
export function SubmitNewDesigner(designerData){

    return function(dispatch){
        dispatch(SubmitNewDesignerRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Post("designer", SubmitNewDesignerResponse, designerData);
    };
}

export function SubmitNewDesignerRequest(){
    return {
        type: at.SUBMIT_NEW_DESIGNER_REQUEST
    }
}

export function SubmitNewDesignerResponse(response){
    return _ResponseHandler(response, at.SUBMIT_NEW_DESIGNER_RESPONSE);
}

export function ClearCreateDesigner(){
    return {type: at.CLEAR_CREATE_DESIGNER};
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

        postman.GetAll("designer", FetchOverviewResponse);
    }
}

export function FetchOverviewRequest(){
    return {
        type: at.DESIGNER_OVERVIEW_FETCH_LIST_REQUEST
    };
}

export function FetchOverviewResponse(response){
    return _ResponseHandler(response, at.DESIGNER_OVERVIEW_FETCH_LIST_RESPOSE);
}

export function DeleteDesigner(id){
    return (dispatch) => {
        postman.Delete("designer", null, id);//Отправляем запрос на удаление из базы
        dispatch(DeleteDesignerFromList(id));
    };
}

export function DeleteDesignerFromList(id){
    return {
        type: at.DELETE_DESIGNER_FROM_LIST,
        payload: id
    };
}

export function DeleteDesignerResponse(response){
    return _ResponseHandler(response, at.DELETE_DESIGNER_RESPONSE);
}

/** Пользователь хочет открыть страницу с формой для редактирования и загрузить экспонат с указаным id */
export function EditDesigner(designerId){
    return (dispatch) => {
        dispatch(GetDesignerRequest(designerId));
        dispatch(DesignerChangePage(2));
    };
}

/** Запрос на сервер чтобы получить полную информацию по выбранному экспонату */
export function GetDesignerRequest(designerId){
    return (dispatch) => {
        postman.GetById("designer", GetDesignerResponse, designerId);
    };
}

/** Ответ от сервера содержащий полную информацию по выбранному экспонату */
export function GetDesignerResponse(response){
    return _ResponseHandler(response, at.GET_DESIGNER_RESPONSE);
}

export function DesignerChangeComplex(id, complex){
    return function(dispatch){
        dispatch(DesignerChangeComplexRequest());

        postman.Put("designer", id, {complex}, DesignerChangeComplexResponse)
            .then(result => result.error ? null : dispatch(DesignerApplyChangeComplex(id, complex)));
    };
}

    export function DesignerChangeComplexRequest(){
        return {
            type: at.DESIGNER_CHANGE_COMPLEX_REQUEST,
        };
    }
    export function DesignerChangeComplexResponse(response){
        return _ResponseHandler(response, at.DESIGNER_CHANGE_COMPLEX_RESPONSE);
    }
    export function DesignerApplyChangeComplex(id, complex){
        return {
            type: at.DESIGNER_APPLY_CHANGE_COMPLEX,
            payload: {id, complex},
        }
    }

//EDIT PAGE

/** Пользователь внес изменения и хочет обновить экспонат на сервере */
export function SubmitDesignerUpdate(designerData, id){

    return function(dispatch){
        dispatch(SubmitDesignerUpdateRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Put("designer", id, designerData, SubmitDesignerUpdateResponse);
    };
}

export function SubmitDesignerUpdateRequest(){
    return {
        type: at.SUBMIT_DESIGNER_UPDATE_REQUEST
    }
}

export function SubmitDesignerUpdateResponse(response){
    return _ResponseHandler(response, at.SUBMIT_DESIGNER_UPDATE_RESPONSE);
}

export function ResetEditData(){
    return {type: at.DESIGNER_RESET_EDIT_DATA};
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