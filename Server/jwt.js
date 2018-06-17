"use strict";
const jwt = require("jsonwebtoken");
const secret = require("../Private/secret.json").secret;

class JWT
{

    Encode(message, exp){
        if(exp) return jwt.sign({login: message.login, password: message.password, exp: exp}, secret);
        else return jwt.sign(message, secret);
    }

    Decode(token){
        return jwt.verify(token, secret);
    }

}


const singleton = new JWT();
module.exports = singleton;

