import * as at from "./appActions.js";

//Action creators------------------------------------------------------------------
export function ChangePage(index){
    return {
        type: at.CHANGE_PAGE,
        payload: {index}
    };
}

export function InvokeSecondTypeAction(){
    return {
        type: at.SECOND_TYPE,
    }
}