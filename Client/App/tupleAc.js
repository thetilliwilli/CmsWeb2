import * as at from "./tupleAt.js";
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
            dispatch({
                type: returnedActionType,
                payload: postmanResponse,
            });
        } 

    };
}

//Action creators------------------------------------------------------------------
export function TupleChangePage(index){
    return {
        type: at.TUPLE_CHANGE_PAGE,
        payload: index
    };
}

export function ChangeLanguage(language){
    return {
        type: at.CHANGE_TUPLE_LANGUAGE,
        payload: language
    }
}


//TUPLE CREATE PAGE----------------------------------------------------------------------
export function SubmitNewTuple(tupleData){

    return function(dispatch){
        dispatch(SubmitNewTupleRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Post("tuple", SubmitNewTupleResponse, tupleData);
    };
}

export function SubmitNewTupleRequest(){
    return {
        type: at.SUBMIT_NEW_TUPLE_REQUEST
    }
}

export function SubmitNewTupleResponse(response){
    return _ResponseHandler(response, at.SUBMIT_NEW_TUPLE_RESPONSE);
}

export function ClearCreateTuple(){
    return {type: at.CLEAR_CREATE_TUPLE};
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

        postman.GetAll("tuple", FetchOverviewResponse);
    }
}

export function FetchOverviewRequest(){
    return {
        type: at.TUPLE_OVERVIEW_FETCH_LIST_REQUEST
    };
}

export function FetchOverviewResponse(response){
    return _ResponseHandler(response, at.TUPLE_OVERVIEW_FETCH_LIST_RESPOSE);
}

export function DeleteTuple(id){
    return (dispatch) => {
        postman.Delete("tuple", null, id);//Отправляем запрос на удаление из базы
        dispatch(DeleteTupleFromList(id));
    };
}

export function DeleteTupleFromList(id){
    return {
        type: at.DELETE_TUPLE_FROM_LIST,
        payload: id
    };
}

export function DeleteTupleResponse(response){
    return _ResponseHandler(response, at.DELETE_TUPLE_RESPONSE);
}

/** Пользователь хочет открыть страницу с формой для редактирования и загрузить экспонат с указаным id */
export function EditTuple(tupleId){
    return (dispatch) => {
        dispatch(TupleChangePage(2));
        dispatch(GetTupleRequest(tupleId));
    };
}

/** Запрос на сервер чтобы получить полную информацию по выбранному экспонату */
export function GetTupleRequest(tupleId){
    return (dispatch) => {
        postman.GetById("tuple", GetTupleResponse, tupleId);
    };
}

/** Ответ от сервера содержащий полную информацию по выбранному экспонату */
export function GetTupleResponse(response){
    return _ResponseHandler(response, at.GET_TUPLE_RESPONSE);
}

/** Пользователь внес изменения и хочет обновить экспонат на сервере */
export function SubmitTupleUpdate(tupleData, id){

    return function(dispatch){
        dispatch(SubmitTupleUpdateRequest());//Меняем состояние чтобы оповестить что пора показывать крутилки

        postman.Put("tuple", id, tupleData, SubmitTupleUpdateResponse);
    };
}

export function SubmitTupleUpdateRequest(){
    return {
        type: at.SUBMIT_TUPLE_UPDATE_REQUEST
    }
}

export function SubmitTupleUpdateResponse(response){
    return _ResponseHandler(response, at.SUBMIT_TUPLE_UPDATE_RESPONSE);
}

//NAVBAR
export function NavbarOpen(){
    return {type: at.NAVBAR_OPEN};
}
export function NavbarClose(){
    return {type: at.NAVBAR_CLOSE};
}

//CATSUB
export function TupleCatsubChange(catsub){
    return {type: at.TUPLE_CATSUB_CHANGE, payload: catsub};
}