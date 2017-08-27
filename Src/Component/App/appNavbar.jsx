"use strict";
import React from "react";
import {Link} from "react-router-dom";

export default function AppNavbar(p){return (
    <div className="AppNavbar" {...p} style={{marginTop:"5vh"}}>
        {/* <DivLink to="/">ДОМ</DivLink> */}
        {/* <DivLink to="/Signup">Регистрация</DivLink>
        <DivLink to="/Login">Войти</DivLink> */}
        <DivLink to="/ExhibitCreator">Новый Экспонат</DivLink>
        <DivLink to="/ExhibitOverview">Все Экспонаты</DivLink>
        <DivLink to="/ExhibitMockupOverview">Шаблоны</DivLink>
    </div>
);};

function DivLink(p){
    return (
        <Link className="DivLink" to={p.to}>
            <div>{p.children}</div>
        </Link>
    );
}