"use strict";
import uuid from "uuid/v4";
import util from "../Module/util.js";

import CORE from "./core.js";

export default {
        page: 0,
        pages: [
            {title: "NEW", subtitle:"Создать бюро"},
            {title: "OVERVIEW", subtitle:"Обзор бюро"},
            {title: "EDIT", subtitle:"Редактировать\u00A0бюро"},
        ],
        language: "ru",
        isNavbarOpen: false,

        errorInformer: {
            error: null
        },
        overview: [],
        bureauCreate: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.bureau),
        },
        bureauEdit: {
            blockControl: false,
            uuid: uuid(),
            data: util.DeepCopy(CORE.bureau),
            template: util.DeepCopy(CORE.bureau),
        }
    };