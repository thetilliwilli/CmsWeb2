"use strict";
import store from "../App/store.js";
import {ChangeLanguage as TagChangeLanguage} from "../App/ac.js";
import {ChangeLanguage as GoloChangeLanguage} from "../App/goloAc.js";
import util from "../Module/util.js";

const CLF = {
    TagChangeLanguage,
    GoloChangeLanguage,
};
class InputController
{
    constructor(pStore){
        if(!pStore) throw new Error("Invalid Store");

        this.store = pStore;
        this.currentEvent = null;
        this.theFunctionName = null;
        window.addEventListener("keydown", (event)=>{
            this.theFunctionName = util.CurrentDomain();
            if((this.theFunctionName==="tuple" || this.theFunctionName==="designer" || this.theFunctionName==="bureau") && (event.key==="F1" || event.key==="F2"))
            {
                event.preventDefault();
                return;
            }
            this.currentEvent = event;
            this.theFunctionName = this.theFunctionName[0].toUpperCase() + this.theFunctionName.slice(1);
            switch(event.key)
            {
                case "F1": this.F1();break;
                case "F2": this.F2();break;
            }
        });
    }

    F1(){ store.dispatch(CLF[this.theFunctionName+"ChangeLanguage"]("ru")); this.currentEvent.preventDefault(); }
    F2(){ store.dispatch(CLF[this.theFunctionName+"ChangeLanguage"]("en")); this.currentEvent.preventDefault(); }
}

export default new InputController(store);