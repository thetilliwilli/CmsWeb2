"use strict";

let pages = {
    exhibitCreatePage:{
        index: "/ExhibitCreator",
        label: "Создание нового экспоната",
        id: 0
    },
    exhibitOverviewPage:{
        index: "/ExhibitOverview",
        label: "Обзор коллекции экспонатов",
        id: 1
    },
    exhibitEditPage:{
        index: "/ExhibitEdit",
        label: "Редактирование экспоната",
        id: 2
    },
    mockupOverviewPage:{
        index: "/MockupOverview",
        label: "Обзор шаблонов",
        id: 3
    }
};

function GetPageById(id){
    for(let page in pages)
        if(pages[page].id === id)
            return pages[page];
    return null;
}

export default {
    pages,
    GetPageById
}