import * as at from "./bureauAt.js";
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

//OVERVIEW PAGE

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

export function BureauChangeComplex(id, complex){
    return function(dispatch){
        dispatch(BureauChangeComplexRequest());

        postman.Put("bureau", id, {complex}, BureauChangeComplexResponse)
            .then(result => result.error ? null : dispatch(BureauApplyChangeComplex(id, complex)));
    };
}

    export function BureauChangeComplexRequest(){
        return {
            type: at.BUREAU_CHANGE_COMPLEX_REQUEST,
        };
    }
    export function BureauChangeComplexResponse(response){
        return _ResponseHandler(response, at.BUREAU_CHANGE_COMPLEX_RESPONSE);
    }
    export function BureauApplyChangeComplex(id, complex){
        return {
            type: at.BUREAU_APPLY_CHANGE_COMPLEX,
            payload: {id, complex},
        }
    }

//EDIT PAGE

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