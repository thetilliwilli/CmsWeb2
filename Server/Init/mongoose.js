"use strict";

const serverConfig = require("../../config.js");
const mongoose = require("mongoose");

module.exports = function MongooseInit(){
    return new Promise((resolve, reject)=>{
        //Настраиваем дефолтные промисы
        mongoose.Promise = global.Promise;
        mongoose.connect(serverConfig.db.connectionString, {useMongoClient:true});

        mongoose.connection.on("error", console.error.bind(console, 'connection error:'));

        mongoose.connection.on("error", reject);
        mongoose.connection.on("open", resolve);
    });
};