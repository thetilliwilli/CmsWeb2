"use strict";

const COUNTRY = [
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