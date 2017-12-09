"use strict";
module.exports = {
    port: 8000,
    webRootPath: `${__dirname}/WebRoot`,
    webRootAuthPath: `${__dirname}/WebRootAuth`,
    staticPath: `${__dirname}/Static`,
    secretKey: "IzidaServer",
    db: {
        port: 27017,
        host: "localhost",
        dbname: "TAG",
        get connectionString(){return `mongodb://${this.host}:${this.port}/${this.dbname}`},
    }
};