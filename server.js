"use strict";
//INCLUDES---------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const config = require("./config.js");
const bodyParser = require("body-parser");
const mainRouter = require("./router.js");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userInfoService = require("./Server/userInfoService.js");
var authRouter = require("./Server/Router/authRouter.js");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var auth = require("./Server/auth.js");
var path = require("path");
const compression = require('compression')

//CONGIFS---------------------------------------------------------------------------------------------------------------------------------------------------------
//LOGIC---------------------------------------------------------------------------------------------------------------------------------------------------------
var app = express();

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/Static", express.static(config.staticPath));//Serve static assets (images, css, js, html) from Static
app.use("/auth", authRouter);//Все что связано с авторизацией, логаутами и логинами
app.use(auth.AuthFirewall);//Access decider
/* Вот здесь надо будет переделать на app.get("*",file.readAll("index.html")) */app.use("/", express.static(config.webRootPath));//Serve static assets from WebRoot
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "WebRoot/index.html"));
});//Redirect to SPA again with new URL requested

app.listen(config.port, ()=>{console.log(`[ContentManagerServer]:(StartListenPort):${config.port}`);});