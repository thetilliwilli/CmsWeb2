"use strict";
export default {
    api:{
        schema: "",
        hostname: (new URL(window.location.href).hostname),
        port: 10002,
        url: "",
        get rootUrl(){ return `${this.schema===""?"":this.schema+":"}//${this.hostname}:${this.port}/${this.url}` }
    },
};