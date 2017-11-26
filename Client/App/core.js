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
    bureau: {
        shortName: "АО «КБП»",
        fullName : "АО «Конструкторское бюро приборостроения» имени академика Г.А. Шипунова.",
        description: "История Конструкторского БЮРО началась в 1972 г...",
        preview : "",//только логотип (без текста)
        logotype : "",//полное изображение логотипа компании (с текстом)
        designers : [],//id конструкторов
    },
    designer: {
        shortName : "Чуканова А.Ф.",
        fullName : "Чуканова Анастасия Федотовна",
        birthDate : "07.07.1932",
        deathDate : "",
        birthPlace : "Воронежская область, Гремяченский район, с. Яблочное ",
        position : "Фрезеровщица инструментального цеха №18, Тульский машиностроительный завод",//занимаемая должность
        totalXP : "",
        industryXP : "44 года",
        education : "Неполное среднее",//образование
        degree : "не имеет",//ученая степень
        biography : "Фрезеровщица инструментального цеха №18",
        awards : "Кавалер ордена Ленина (1970 г.)",
        characteristics : "Высококлассный специалист - инструментальщик по изготовлению технологической оснастки, используемой в военном производстве.",
        portrait: "",//портрет конструктора
        bureau: "",//id КБ в ком работал конструтор
    }
};