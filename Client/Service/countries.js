"use strict";

const COUNTRIES = [
    {name:"AUSTRIA"},
    {name:"BRITAIN"},
    {name:"ENGLAND"},
    {name:"GERMANY"},
    {name:"ITALY"},
    {name:"USSR"},
    {name:"RUSSIA"},
    {name:"BELGIUM"},
    {name:"FRANCE"},
    {name:"ISRAEL"},
    {name:"CHINA"},
    {name:"USA"},
    {name:"JAPAN"},
    {name:"FINLAND"},
    {name:"SWITZERLAND"},
    {name:"INDIA"},
    {name:"S_KOREA"},
    {name:"S_AFRICA"},
    {name:"POLAND"},
    {name:"SWEDEN"},
    {name:"ARGENTINA"},
    {name:"BRAZIL"},
    {name:"CZECHOSLOVAKIA"},
    {name:"GEORGIA"},
    {name:"SPAIN"},
    {name:"ROMANIA"},
    {name:"ARMENIA"},
    {name:"UKRAINE"},
    {name:"YUGOSLAVIA"},
    {name:"CZECH"},
    {name:"KAZAKHSTAN"}
];

class CountriesService
{

    get count(){
        return COUNTRIES.length;
    }

    get default(){
        return COUNTRIES.find(i=>i.name==="RUSSIA");
    }

    GetAll(){
        return COUNTRIES;
    }

    GetNameList(){
        return COUNTRIES.map(i=>i.tag);
    }

    // GetLabelList(){
    //     return COUNTRIES.map(i=>i.label);
    // }

    GetByName(name){
        const index = COUNTRIES.findIndex( i => i.tag===name);
        if(index === undefined)
            throw new Error(`Countries doesnt registered: -${name}-`);
        return COUNTRIES[index];
    }
}

const singleton = new CountriesService();
export default singleton;