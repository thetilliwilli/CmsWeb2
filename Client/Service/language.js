"use strict";

const LANGUAGE = [
    {tag:"ru", label:"ru"},
    {tag:"en", label:"en"},
];

class LanguageService
{

    get count(){
        return LANGUAGE.length;
    }

    get default(){
        return LANGUAGE[0];
    }

    GetAll(){
        return LANGUAGE;
    }

    GetTagList(){
        return LANGUAGE.map(i=>i.tag);
    }

    GetLabelList(){
        return LANGUAGE.map(i=>i.label);
    }

    GetByTag(tag){
        const index = LANGUAGE.findIndex( i => i.tag===tag);
        if(index === undefined)
            throw new Error(`Language doesnt registered: -${tag}-`);
        return LANGUAGE[index];
    }
}

const singleton = new LanguageService();
export default singleton;