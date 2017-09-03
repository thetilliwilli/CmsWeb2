import * as at from "./at.js";

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

export function SaveStateStaticPropsRu(fields){
    return {
        type: at.SAVE_STATE_STATIC_PROPS_EN,
        payload: {fields}
    }
}