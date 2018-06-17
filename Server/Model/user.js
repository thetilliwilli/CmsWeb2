"use strict";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    login: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, default:""},
    readOnly: {type: Boolean, default:true},
    startExpiration: {type:Number, default:0},//с какого момента отсчитывать протухание
    expiration: {type:Number, default:8*60*60},//8 часов с момента startExpiration
});

module.exports = mongoose.model("User", UserSchema);