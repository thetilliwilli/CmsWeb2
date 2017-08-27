"use strict";
import React from "react";
import {Link} from "react-router-dom";

export default function AppHeader(){
    return (
        <div className="AppHeader">
            <div style={{float:"left", paddingLeft:"5vw"}}></div>
            <div style={{float:"right", paddingRight:"5vw"}}>
                <Link to="/Signup" style={{marginLeft:"10px"}}>Регистрация</Link>
                <Link to="/Login" style={{marginLeft:"10px"}}>Войти</Link>
            </div>
        </div>
    );
};