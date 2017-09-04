var userInfoService = require("./userInfoService.js");


class Auth
{
    constructor(core){
        this.redirectUrl = core.redirectUrl;
        this.AuthFirewall = this.AuthFirewall.bind(this);
    }

    IsAuth(req){
        var isAuth = false;
        
        if(req.cookies)
        {
            var login = req.cookies.login;
            var password = req.cookies.password;
        
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
        if(this.IsAuth(req))
            next();
        else
            return res.redirect(this.redirectUrl);
    }

    TryLogin(res, user){

        var userInfo = userInfoService.GetUserInfo(user.login);
        if(userInfo && (user.login === userInfo.login) && (user.password === userInfo.password))
        {
            res.cookie("login", userInfo.login, { maxAge: 90000000/* , httpOnly: true  */});
            res.cookie("password", userInfo.password, { maxAge: 90000000/* , httpOnly: true  */});
            return true;
        }
        else
            return false;
    }

    TryLogout(res){
        res.clearCookie("login");
        res.clearCookie("password");
        return true;
    }
}

module.exports = new Auth({
    redirectUrl: "/auth/login"
});