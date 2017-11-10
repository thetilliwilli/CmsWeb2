"use strict";
import uuid from "uuid/v4";
import util from "../Module/util.js";

import CORE from "./core.js";

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
            data: util.DeepCopy(CORE.tag),
        },
        exhibitEdit: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.tag),
            template: util.DeepCopy(CORE.tag),
        }
    };