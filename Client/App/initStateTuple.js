"use strict";
import uuid from "uuid/v4";
import util from "../Module/util.js";

import CORE from "./core.js";

export default {
        page: 0,
        pages: [
            {title: "NEW", ruTitle: "СОЗДАТЬ", subtitle:"Создать экспонат"},
            {title: "OVERVIEW", ruTitle: "ОБЗОР", subtitle:"Обзор экспонатов"},
            {title: "EDIT", ruTitle: "РЕДАКТИРОВАТЬ", subtitle:"Редактировать\u00A0экспонат"},
        ],
        language: "ru",
        isNavbarOpen: false,

        errorInformer: {
            error: null
        },

        tupleCreate: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.tuple),
        },
        overview: [],
        tupleEdit: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.tuple),
            template: util.DeepCopy(CORE.tuple),
        }
    };