"use strict";

const DEFAULT_DATE = "2017-01-01T00:00:00.000Z";

export default {
    tag: {
        imageGallery: [],
        fields: [],
        name: { ru: "", en: "", label: "Название Экспоната", type: "string" },
        title: { ru: "", en: "", label: "Заголовок Экспоната", type: "string" },
        subtitle: { ru: "", en: "", label: "Подзаголовок Экспоната", type: "string" },
        date: DEFAULT_DATE,
        location: { ru: "", en: "", label: "Место производство", type: "string" },
        history: { ru: "", en: "", label: "История создания", type: "string" },
        description: { ru: "", en: "", label: "Подробное описание", type: "string" },
        coverImage: "",
        complex: "",
        ordinal: 0,
    },
    tuple: {
        imageGallery: [],
        fields: [],
        name: "",
        catsub: "",
        countries: [],
        description: "",
        coverImage: ""
    },
    golo: {
        imageGallery: [],
        fields: [],
        name: { ru: "", en: "", label: "Название Экспоната", type: "string" },
        title: { ru: "", en: "", label: "Заголовок Экспоната", type: "string" },
        subtitle: { ru: "", en: "", label: "Подзаголовок Экспоната", type: "string" },
        date: DEFAULT_DATE,
        location: { ru: "", en: "", label: "Место производство", type: "string" },
        history: { ru: "", en: "", label: "История создания", type: "string" },
        description: { ru: "", en: "", label: "Подробное описание", type: "string" },
        video: "",
        complex: "",
        ordinal: 0,
    },
    designer: {
        shortName : "",
        fullName : "",
        birthDate : "",
        deathDate : "",
        birthPlace : "",
        position : "",
        totalXP : "",
        industryXP : "",
        education : "",
        degree : "",
        biography : "",
        awards : "",
        characteristics : "",
        portrait: "",
        bureau: "", //BureauID
    },
    bureau: {
        shortName: "",
        fullName : "",
        description: "",
        preview : "",//href to image
        logotype : "",//href to image
        designers : [String],//id конструкторов
    }
};