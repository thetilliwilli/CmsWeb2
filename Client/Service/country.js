"use strict";

const COUNTRY = [
    {name:"АВСТРИЯ"},
    {name:"БРИТАНИЯ"},
    {name:"ВЕЛИКОБРИТАНИЯ"},
    {name:"ГЕРМАНИЯ"},
    {name:"ИТАЛИЯ"},
    {name:"СССР"},
    {name:"РОССИЯ"},
    {name:"БЕЛЬГИЯ"},
    {name:"ФРАНЦИЯ"},
    {name:"ИЗРАИЛЬ"},
    {name:"КИТАЙ"},
    {name:"США"},
    {name:"ЯПОНИЯ"},
    {name:"ФИНЛЯНДИЯ"},
    {name:"ШВЕЙЦАРИЯ"},
    {name:"ИНДИЯ"},
    {name:"ЮЖНАЯ КОРЕЯ"},
    {name:"ЮЖНАЯ АФРИКА"},
    {name:"ПОЛЬША"},
    {name:"ЦВЕЦИЯ"},
    {name:"АРГЕНТИНА"},
    {name:"БРАЗИЛИЯ"},
    {name:"ЧЕХОСЛОВАКИЯ"},
    {name:"ГРУЗИЯ"},
    {name:"ИСПАНИЯ"},
    {name:"РУМЫНИЯ"},
    {name:"АРМЕНИЯ"},
    {name:"УКРАИНА"},
    {name:"ЮГОСЛАВИЯ"},
    {name:"ЧЕХИЯ"},
    {name:"КАЗАХСТАН"},
];

class CountryService
{

    get count(){
        return COUNTRY.length;
    }

    get default(){
        return COUNTRY.find(i=>i.name==="RUSSIA");
    }

    GetAll(){
        return COUNTRY;
    }

    GetNameList(){
        return COUNTRY.map(i=>i.name);
    }

    // GetLabelList(){
    //     return COUNTRIES.map(i=>i.label);
    // }

    GetByName(name){
        const index = COUNTRY.findIndex( i => i.name===name);
        if(index === undefined)
            throw new Error(`Country doesnt registered: -${name}-`);
        return COUNTRY[index];
    }
}

const singleton = new CountryService();
export default singleton;