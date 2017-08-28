//INCLUDES---------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const config = require("./config.js");
const bodyParser = require("body-parser");
const mainRouter = require("./router.js");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userInfoService = require("./Server/userInfoService.js");
//CONGIFS---------------------------------------------------------------------------------------------------------------------------------------------------------
passport.use(new LocalStrategy(function(username, password, done){
    var userInfo = userInfoService.GetUserInfo(username);
    if(userInfo && userInfo.password===password)
        return done(null, userInfo);
}));
//LOGIC---------------------------------------------------------------------------------------------------------------------------------------------------------
var app = express();

app.use("/login", (req, res)=>{res.sendFile(__dirname + "/WebRoot/index.html")});
app.use(passport.authenticate("local", {failureRedirect: "/login"}));
app.use("/", express.static(config.webRootPath));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(config.port, ()=>{console.log(`[ContentManagerServer]:(StartListenPort):${config.port}`);});