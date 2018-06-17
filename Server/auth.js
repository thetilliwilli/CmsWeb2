"use strict";
var userInfoService = require("./userInfoService.js");
const jwt = require("./jwt.js");


class Auth
{
    constructor(core){
        this.redirectUrl = core.redirectUrl;
        this.AuthFirewall = this.AuthFirewall.bind(this);
    }

    IsAuth(req){
        var isAuth = false;
        
        if(req.cookies && req.cookies.blob)
        {
            const {login, password} = jwt.Decode(req.cookies.blob);
        
            if(login && password)
            {
                var userInfo = userInfoService.GetUserInfo(login);
                if((userInfo.login === login) && (userInfo.password === password))
                    isAuth = true;
            }
        }

        return isAuth;
    }

    AuthFirewall(req, res, next){
        var isAuth = false;
        try
        {
            isAuth = this.IsAuth(req);
            if(isAuth)
                next();
            else
                return res.redirect(this.redirectUrl);
        }
        catch(error)
        {
            return res.redirect(this.redirectUrl);
        }
    }

    TryLogin(res, user){

        var userInfo = userInfoService.GetUserInfo(user.login);
        if(userInfo && (user.login === userInfo.login) && (user.password === userInfo.password))
        {
            var exp = undefined;
            if(userInfo.readOnly)
                exp = userInfo.startExpiration + userInfo.expiration;
            const token = jwt.Encode({login: userInfo.login, password: userInfo.password}, exp);
            res.cookie("blob", token, { maxAge: 14400 * 1000});
            return true;
        }
        else
            return false;
    }

    TryLogout(res){
        res.clearCookie("blob");
        return true;
    }
}

module.exports = new Auth({
    redirectUrl: "/auth/login"
});