import * as at from "./bureauAt.js";
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
export function BureauChangePage(index){
    return {
        type: at.BUREAU_CHANGE_PAGE,
        payload: index
    };
}

export function ChangeLanguage(language){
    return {
        type: at.CHANGE_BUREAU_LANGUAGE,
        payload: language
    }
}


//BUREAU CREATE PAGE----------------------------------------------------------------------
export function SubmitNewBureau(bureauData){

    return function(dispatch){
        dispatch(SubmitNewBureauRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Post("bureau", SubmitNewBureauResponse, bureauData);
    };
}

export function SubmitNewBureauRequest(){
    return {
        type: at.SUBMIT_NEW_BUREAU_REQUEST
    }
}

export function SubmitNewBureauResponse(response){
    return _ResponseHandler(response, at.SUBMIT_NEW_BUREAU_RESPONSE);
}

export function ClearCreateBureau(){
    return {type: at.CLEAR_CREATE_BUREAU};
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

        postman.GetAll("bureau", FetchOverviewResponse);
    }
}

export function FetchOverviewRequest(){
    return {
        type: at.BUREAU_OVERVIEW_FETCH_LIST_REQUEST
    };
}

export function FetchOverviewResponse(response){
    return _ResponseHandler(response, at.BUREAU_OVERVIEW_FETCH_LIST_RESPOSE);
}

export function DeleteBureau(id){
    return (dispatch) => {
        postman.Delete("bureau", null, id);//Отправляем запрос на удаление из базы
        dispatch(DeleteBureauFromList(id));
    };
}

export function DeleteBureauFromList(id){
    return {
        type: at.DELETE_BUREAU_FROM_LIST,
        payload: id
    };
}

export function DeleteBureauResponse(response){
    return _ResponseHandler(response, at.DELETE_BUREAU_RESPONSE);
}

/** Пользователь хочет открыть страницу с формой для редактирования и загрузить экспонат с указаным id */
export function EditBureau(bureauId){
    return (dispatch) => {
        dispatch(GetBureauRequest(bureauId));
        dispatch(BureauChangePage(2));
    };
}

/** Запрос на сервер чтобы получить полную информацию по выбранному экспонату */
export function GetBureauRequest(bureauId){
    return (dispatch) => {
        postman.GetById("bureau", GetBureauResponse, bureauId);
    };
}

/** Ответ от сервера содержащий полную информацию по выбранному экспонату */
export function GetBureauResponse(response){
    return _ResponseHandler(response, at.GET_BUREAU_RESPONSE);
}

/** Пользователь внес изменения и хочет обновить экспонат на сервере */
export function SubmitBureauUpdate(bureauData, id){

    return function(dispatch){
        dispatch(SubmitBureauUpdateRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Put("bureau", id, bureauData, SubmitBureauUpdateResponse);
    };
}

export function SubmitBureauUpdateRequest(){
    return {
        type: at.SUBMIT_BUREAU_UPDATE_REQUEST
    }
}

export function SubmitBureauUpdateResponse(response){
    return _ResponseHandler(response, at.SUBMIT_BUREAU_UPDATE_RESPONSE);
}

export function ResetEditData(){
    return {type: at.BUREAU_RESET_EDIT_DATA};
}

//NAVBAR
export function NavbarOpen(){
    return {type: at.NAVBAR_OPEN};
}
export function NavbarClose(){
    return {type: at.NAVBAR_CLOSE};
}

//CATSUB
export function BureauCatsubChange(mode, catsub){
    return {type: at.BUREAU_CATSUB_CHANGE, payload:{mode, catsub}};
}
//COUNTRY
export function BureauChangeCountries(mode, countries){
    return {type: at.BUREAU_CHANGE_COUNTRIES, payload: {mode, countries}};
}