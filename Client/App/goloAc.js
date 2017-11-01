import * as at from "./goloAt.js";
import postman from "../Module/postmanService.js";
import {ShowSuccessInformer} from "./ac.js";

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
export function GoloChangePage(index){
    return {
        type: at.GOLO_CHANGE_PAGE,
        payload: index
    };
}

export function ChangeLanguage(language){
    return {
        type: at.CHANGE_GOLO_LANGUAGE,
        payload: language
    }
}


//GOLO CREATE PAGE----------------------------------------------------------------------
export function SubmitNewGolo(goloData){

    return function(dispatch){
        dispatch(SubmitNewGoloRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Post("golo", SubmitNewGoloResponse, goloData);
    };
}

export function SubmitNewGoloRequest(){
    return {
        type: at.SUBMIT_NEW_GOLO_REQUEST
    }
}

export function SubmitNewGoloResponse(response){
    return _ResponseHandler(response, at.SUBMIT_NEW_GOLO_RESPONSE);
}

export function ClearCreateGolo(){
    return {type: at.CLEAR_CREATE_GOLO};
}

//ERROR INFORMER----------------------------------------------------------------------
export function HideErrorWindow(){
    return { type: at.HIDE_ERROR_WINDOW }
}

export function ShowErrorWindow(error){
    return { type: at.SHOW_ERROR_WINDOW, payload: error }
}


export function FetchOverview(){
    return function(dispatch){
        dispatch(FetchOverviewRequest());

        postman.GetAll("golo", FetchOverviewResponse);
    }
}

export function FetchOverviewRequest(){
    return {
        type: at.GOLO_OVERVIEW_FETCH_LIST_REQUEST
    };
}

export function FetchOverviewResponse(response){
    return _ResponseHandler(response, at.GOLO_OVERVIEW_FETCH_LIST_RESPOSE);
}

export function DeleteGolo(id){
    return (dispatch) => {
        postman.Delete("golo", null, id);//Отправляем запрос на удаление из базы
        dispatch(DeleteGoloFromList(id));
    };
}

export function DeleteGoloFromList(id){
    return {
        type: at.DELETE_GOLO_FROM_LIST,
        payload: id
    };
}

export function DeleteGoloResponse(response){
    return _ResponseHandler(response, at.DELETE_GOLO_RESPONSE);
}

/** Пользователь хочет открыть страницу с формой для редактирования и загрузить экспонат с указаным id */
export function EditGolo(goloId){
    return (dispatch) => {
        dispatch(GetGoloRequest(goloId));
        dispatch(GoloChangePage(2));
    };
}

/** Запрос на сервер чтобы получить полную информацию по выбранному экспонату */
export function GetGoloRequest(goloId){
    return (dispatch) => {
        postman.GetById("golo", GetGoloResponse, goloId);
    };
}

/** Ответ от сервера содержащий полную информацию по выбранному экспонату */
export function GetGoloResponse(response){
    return _ResponseHandler(response, at.GET_GOLO_RESPONSE);
}

/** Пользователь внес изменения и хочет обновить экспонат на сервере */
export function SubmitGoloUpdate(goloData, id){

    return function(dispatch){
        dispatch(SubmitGoloUpdateRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Put("golo", id, goloData, SubmitGoloUpdateResponse);
    };
}

export function SubmitGoloUpdateRequest(){
    return {
        type: at.SUBMIT_GOLO_UPDATE_REQUEST
    }
}

export function SubmitGoloUpdateResponse(response){
    return _ResponseHandler(response, at.SUBMIT_GOLO_UPDATE_RESPONSE);
}

export function ResetEditData(){
    return {type: at.RESET_EDIT_DATA};
}

//NAVBAR
export function NavbarOpen(){
    return {type: at.NAVBAR_OPEN};
}
export function NavbarClose(){
    return {type: at.NAVBAR_CLOSE};
}