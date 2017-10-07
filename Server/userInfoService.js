"use strict";
const userStorage = [];

userStorage.push({login: "tilli", password:"willi", name:"", id:1});
userStorage.push({login: "1", password:"1", name:"TilliWilli", id:2});
userStorage.push({login: "visuals", password:"visuals11", name:"visuals.ru", id:3});


class UserInfoService
{
    GetUserInfo(login){
        return userStorage.find(u=>u.login === login);
    }
    GetUserInfoById(id){
        return userStorage.find(u=>u.id === id);
    }
}
const singleton = new UserInfoService();
module.exports = singleton;