"use strict";
export default {
    api:{
        schema: "http",
        hostname: (new URL(window.location.href).hostname),
        port: 8080,
        url: "",
        get rootUrl(){ return `${this.schema}://${this.hostname}:${this.port}/${this.url}` }
    },
};