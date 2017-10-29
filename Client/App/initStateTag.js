"use strict";
import uuid from "uuid/v4";

const DEFAULT_DATE = "2017-01-01T00:00:00.000Z";

export default {
        page: 0,
        pages: [
            {title: "NEW", subtitle:"Создать экспонат"},
            {title: "OVERVIEW", subtitle:"Обзор экспонатов"},
            {title: "EDIT", subtitle:"Редактировать\u00A0экспонат"},
        ],
        language: "ru",
        isNavbarOpen: false,

        errorInformer: {
            error: null
        },
        overview: [],
        exhibitCreate: {
            blockControl: false,
            uuid: uuid(),
            data: {
                imageGallery: [],
                fields: [],
                name: { ru: "", en: "", label: "Название Экспоната", type: "string" },
                title: { ru: "", en: "", label: "Заголовок Экспоната", type: "string" },
                subtitle: { ru: "", en: "", label: "Подзаголовок Экспоната", type: "string" },
                date: DEFAULT_DATE,
                location: { ru: "", en: "", label: "Место производство", type: "string" },
                history: { ru: "", en: "", label: "История создания", type: "string" },
                description: { ru: "", en: "", label: "Подробное описание", type: "string" },
                coverImage: "/Static/img/defaultExhibitAvatar.jpg",
                complex: "",
                ordinal: 0,
            },
        },
        exhibitEdit: {
            blockControl: false,
            uuid: uuid(),
            data: {
                imageGallery: [],
                fields: [],
                name: { ru: "", en: "", label: "Название Экспоната", type: "string" },
                title: { ru: "", en: "", label: "Заголовок Экспоната", type: "string" },
                subtitle: { ru: "", en: "", label: "Подзаголовок Экспоната", type: "string" },
                date: DEFAULT_DATE,
                location: { ru: "", en: "", label: "Место производство", type: "string" },
                history: { ru: "", en: "", label: "История создания", type: "string" },
                description: { ru: "", en: "", label: "Подробное описание", type: "string" },
                coverImage: "/Static/img/defaultExhibitAvatar.jpg",
                complex: "",
                ordinal: 0,
            },
        }
    };