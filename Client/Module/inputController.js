"use strict";
import store from "../App/store.js";
import * as ac from "../App/ac.js";

class InputController
{
    constructor(pStore){
        if(!pStore) throw new Error("Invalid Store");

        this.store = pStore;
        this.currentEvent = null;
        window.addEventListener("keydown", (event)=>{
            this.currentEvent = event;
            switch(event.key)
            {
                case "F1": this.F1();break;
                case "F2": this.F2();break;
            }
        });
    }

    F1(){ store.dispatch(ac.ChangeLanguage("ru")); this.currentEvent.preventDefault(); }
    F2(){ store.dispatch(ac.ChangeLanguage("en")); this.currentEvent.preventDefault(); }
}

export default new InputController(store);