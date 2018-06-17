"use strict";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, default:""},
    readOnly: {type: Boolean, default:true},
    startExpiration: {type:Number, default:0},//с какого момента отсчитывать протухание - дефолтное с начала времен
    expiration: {type:Number, default:24*60*60},//24 часа с момента startExpiration
});

module.exports = mongoose.model("User", UserSchema);