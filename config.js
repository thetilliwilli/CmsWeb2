"use strict";
module.exports = {
    port: 80,
    webRootPath: `${__dirname}/WebRoot`,
    webRootAuthPath: `${__dirname}/WebRootAuth`,
    staticPath: `${__dirname}/Static`,
    secretKey: "IzidaServer",
    dbConnectionString: "mongodb://localhost/CmsWeb"
};