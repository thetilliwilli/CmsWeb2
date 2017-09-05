"use strict";
export default {
    api:{
        schema: "http",
        hostname: "localhost",
        port: 8080,
        url: "",
        get rootUrl(){ return `${this.schema}://${this.hostname}:${this.port}/${this.url}` }
    },
};