import * as at from "./designerAt.js";
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

//CATSUB
export function DesignerCatsubChange(mode, catsub){
    return {type: at.DESIGNER_CATSUB_CHANGE, payload:{mode, catsub}};
}
//COUNTRY
export function DesignerChangeCountries(mode, countries){
    return {type: at.DESIGNER_CHANGE_COUNTRIES, payload: {mode, countries}};
}