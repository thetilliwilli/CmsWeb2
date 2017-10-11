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

        tupleCreate: {
            blockControl: false,
            uuid: uuid(),
            data: {
                imageGallery: [],
                fields: [],
                name: "",
                catsub: "",
                countries: [],
                description: "",
                coverImage: "/Static/img/defaultTupleAvatar.jpg"
            },
        },
        overview: [],
        tupleEdit: {
            blockControl: false,
            uuid: uuid(),
            data: {
                imageGallery: [],
                fields: [],
                name: "",
                catsub: "",
                countries: [],
                description: "",
                coverImage: "/Static/img/defaultTupleAvatar.jpg"
            },
        }
    };