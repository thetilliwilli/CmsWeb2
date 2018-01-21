"use strict";
const express = require("express");
const router = require("express").Router();
const config = require("../../config.js");
const auth = require("../auth.js");

router.use("/login", express.static(config.webRootAuthPath));
router.post("/login", (req, res, next)=>{
    if(!req.body || !req.body.login || !req.body.password)
        return res.redirect("/auth/login");

    var login = req.body.login;
    var password = req.body.password;

    if(auth.TryLogin(res, {login, password}))
        return res.status(200).end("OK");
    else
        return res.status(302).redirect("/auth/login");
});

router.post("/logout", (req, res, next)=>{
    auth.TryLogout(res);
    return res.redirect("/");
});

module.exports = router;