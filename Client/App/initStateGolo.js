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

        goloCreate: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.golo),
        },
        overview: [],
        goloEdit: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.golo),
            template: util.DeepCopy(CORE.golo),
        }
    };