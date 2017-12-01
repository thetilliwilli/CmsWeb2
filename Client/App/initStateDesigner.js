"use strict";
import uuid from "uuid/v4";
import util from "../Module/util.js";

import CORE from "./core.js";

export default {
        page: 0,
        pages: [
            {title: "NEW", subtitle:"Создать описание"},
            {title: "OVERVIEW", subtitle:"Обзор конструкторов"},
            {title: "EDIT", subtitle:"Редактировать\u00A0описание"},
        ],
        language: "ru",
        isNavbarOpen: false,

        errorInformer: {
            error: null
        },

        designerCreate: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.designer),
        },
        overview: [],
        designerEdit: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.designer),
            template: util.DeepCopy(CORE.designer),
        }
    };