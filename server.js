//INCLUDES---------------------------------------------------------------------------------------------------------------------------------------------------------
const express = require("express");
const config = require("./config.js");
const bodyParser = require("body-parser");
const mainRouter = require("./router.js");
const passport = require("passport");
//CONGIFS---------------------------------------------------------------------------------------------------------------------------------------------------------

//LOGIC---------------------------------------------------------------------------------------------------------------------------------------------------------
var app = express();

app.use("/", express.static(config.webRootPath));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(config.port, ()=>{console.log(`[ContentManagerServer]:(StartListenPort):${config.port}`);});