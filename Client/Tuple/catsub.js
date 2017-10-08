"use strict";
import util from "../Modules/util.js";
import uuid from "uuid/v4";

const CATSUB = [
    //NONE---------------------------------------
    {name: "NONE", entries: []},

    //INFANTRY---------------------------------------
    {name: "INFANTRY.PISTOL", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес с патронами",
        "Емкость магазина",
        "Патрон",
        "Начальная скорость пули"
    ]},
    {name: "INFANTRY.TOMMY_GUN", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес с патронами",
        "Темп стрельбы",
        "Боевая скорострельность",
        "Дальность стрельбы",
        "Емкость магазина",
        "Патрон",
        "Начальная скорость пули"
    ]},
    {name: "INFANTRY.REVOLVER", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес",
        "Емкость барабана",
        "Патрон",
        "Начальная скорость пули"
    ]},
    {name: "INFANTRY.PTRK", entries: [
        "Калибр ракеты",
        "Длина ракеты",
        "Вес общий",
        "Вес ракеты",
        "Дальность стрельбы",
        "Максимальная скорость полета",
        "Боевая скорострельность",
        "Тип боевой части ракеты",
        "Бронепробиваемость",
        "Боевой расчет"
    ]},
    {name: "INFANTRY.ASSAULT_RIFLE", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес",
        "Емкость магазина",
        "Темп стрельбы",
        "Боевая скорострельность: одиночный огонь",
        "Боевая скорострельность: автоматический огонь",
        "Прицельная дальность",
        "Эффективная дальность стрельбы",
        "Патрон",
        "Начальная скорость пули"
    ]},
    {name: "INFANTRY.GRENADE_LAUNCHER", entries: [
        "Калибр",
        "Длина общая",
        "Вес общий",
        "Прицельная дальность",
        "Скорострельность",
        "Дальность стрельбы",
        "Начальная скорость",
        "Граната"
    ]},
    {name: "INFANTRY.AUTOMATIC_MACHINE", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес",
        "Емкость магазина",
        "Темп стрельбы",
        "Боевая скорострельность: одиночный огонь",
        "Боевая скорострельность: автоматический огонь",
        "Прицельная дальность",
        "Эффективная дальность стрельбы",
        "Патрон",
        "Начальная скорость пули"
    ]},
    {name: "INFANTRY.MACHINE_GUN", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес",
        "Емкость магазина",
        "Темп стрельбы",
        "Боевая скорострельность: одиночный огонь",
        "Боевая скорострельность: автоматический огонь",
        "Прицельная дальность",
        "Эффективная дальность стрельбы",
        "Патрон",
        "Начальная скорость пули"
    ]},
    {name: "INFANTRY.SNIPER_RIFLE ", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес без патронов",
        "Вес с патронами",
        "Боевая скорострельность",
        "Прицельная дальность",
        "Емкость магазина",
        "Патрон",
        "Начальная скорость пули"
    ]},
    
    


    //VEHICLE---------------------------------------
    {name: "VEHICLE.AUTOMATIC_ARTILLERY", entries: [
        "Калибр",
        "Длина общая",
        "Длина ствола",
        "Вес",
        "Темп стрельбы",
        "Боеприпас",
        "Начальная скорость снаряда"
    ]},
    {name: "VEHICLE.NAVAL_ROCKET", entries: [
        "Вес комплекса",
        "Вес боевой части",
        "Вес ракеты",
        "Длина ракеты",
        "Тип ракеты",
        "Дальность поражения цели",
        "Высота поражения цели"
    ]},
    {name: "VEHICLE.WARSHIP", entries: [
        "Длина",
        "Ширина",
        "Высота",
        "Водоизмещение",
        "Скорость",
        "Запас хода",
        "Вооружение",
        "Экипаж"
    ]},
    {name: "VEHICLE.APC", entries: [
        "Длина",
        "Ширина",
        "Высота",
        "Вес",
        "Бронирование",
        "Мощность двигателя",
        "Скорость",
        "Вооружение",
        "Экипаж",
        "Десант"
    ]},
    {name: "VEHICLE.TANK", entries: [
        "Длина максимальная",
        "Ширина",
        "Высота",
        "Вес",
        "Бронирование",
        "Мощность двигателя",
        "Скорость",
        "Вооружение",
        "Экипаж"
    ]},
    {name: "VEHICLE.HELICOPTER", entries: [
        "Длина",
        "Диаметр главного винта",
        "Вес максимальный",
        "Скорость максимальная",
        "Скорость крейсерская",
        "Дальность действия",
        "Практический потолок",
        "Вооружение",
        "Экипаж"
    ]},
    {name: "VEHICLE.SZU", entries: [
        "Длина",
        "Ширина",
        "Высота",
        "Вес",
        "Бронирование",
        "Мощность двигателя",
        "Максимальная скорость",
        "Скорострельность",
        "Вооружение",
        "Боекомплект",
        "Типы боеприпасов",
        "Дальность стрельбы",
        "Экипаж"
    ]},
    {name: "VEHICLE.RSZO", entries: [
        "Калибр",
        "Вес максимальный",
        "Вес ракеты",
        "Количество направляющих",
        "Максимальная дальность стрельбы",
        "Площадь поражения одним залпом",
        "Мощность двигателя",
        "Скорость по шоссе",
        "Расчет"
    ]},
    {name: "VEHICLE.AIRPLANES", entries: [
        "Длина",
        "Размах крыла",
        "Вес максимальный",
        "Скорость крейсерская",
        "Скорость максимальная",
        "Практический потолок",
        "Дальность",
        "Вооружение",
        "Экипаж"
    ]},
    {name: "VEHICLE.SAU", entries: [
        "Длина",
        "Вес",
        "Бронирование",
        "Калибр орудия",
        "Боекомплект",
        "Типы боеприпасов",
        "Дальность стрельбы",
        "Скорострельность",
        "Мощность двигателя",
        "Максимальная скорость",
        "Запас хода",
        "Расчет"
    ]},
    {name: "VEHICLE.MORTAR", entries: [
        "Калибр",
        "Длина ствола",
        "Вес",
        "Боевая скорострельность",
        "Боеприпас",
        "Максимальная дальность стрельбы",
        "Расчет"
    ]},
    {name: "VEHICLE.TOWED_ARTILLERY", entries: [
        "Калибр",
        "Длина ствола",
        "Вес",
        "Боевая скорострельность",
        "Боеприпас",
        "Максимальная дальность стрельбы",
        "Расчет"
    ]},
    {name: "VEHICLE.FIGHTING_VEHICLE", entries: [
        "Вес",
        "Длина",
        "Ширина",
        "Высота",
        "Бронирование",
        "Мощность двигателя",
        "Максимальная скорость",
        "Максимальный запас хода",
        "Вооружение",
        "Экипаж",
        "Десант"
    ]},
];


class CatsubFabric
{

    Get(name){
        if(CATSUB.find(i => i.name === name) === undefined)
            throw new Error(`[Catsub]: Такая категория отсутсвует - ${name}`);
        
        return CATSUB.find(i => i.name === name).entries.map( (i,index) => ({
            name: {ru: i, en: i},
            value: {ru: "", en: ""},
            index: index,
            id: uuid(),
        }));

    }
}

const singleton = new CatsubFabric();

export default singleton;