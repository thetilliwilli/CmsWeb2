import config from "./config.js";

class PostmanService
{
    constructor(config){
        if(!config) throw new Error("Invalid config argument");
        this.rootUrl = config.api.rootUrl[config.api.rootUrl.length-1]==="/"?config.api.rootUrl.slice(0, -1):config.api.rootUrl;
    }

    GetAll(channel){
        if(!channel)
            throw new Error("Invalid arguments");

        const options = {
            method: "GET",
            mode: "no-cors",
        };

        return window.fetch(`${this.rootUrl}/${channel}`, options);
    }

    GetById(channel, id){
        if(!channel || !id)
            throw new Error("Invalid arguments");

        const options = {
            method: "GET",
            mode: "no-cors",
        };

        return window.fetch(`${this.rootUrl}/${channel}/${id}`, options);
    }

    Post(channel, data){
        if(!channel || !data)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "POST",
            mode: "no-cors",
            headers,
            body: (typeof data === "string" ? data : JSON.stringify(data))
        };

        return window.fetch(`${this.rootUrl}/${channel}`, options);
    }

    Put(channel, id, data){
        if(!channel || !id || !data)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "Put",
            mode: "no-cors",
            headers,
            body: (typeof data === "string" ? data : JSON.stringify(data))
        };

        return window.fetch(`${this.rootUrl}/${channel}/${id}`, options);
    }

    Delete(channel, id){
        if(!channel || !id)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "Delete",
            mode: "no-cors",
            headers
        };

        return window.fetch(`${this.rootUrl}/${channel}/${id}`, options);
    }
}

export default new PostmanService(config);