const userStorage = [];

userStorage.push({login: "tilli", password:"willi", name:"", id:1});


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