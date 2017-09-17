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
            mode: "cors",
        };

        return this._PromiseToJsonOrError(window.fetch(`${this.rootUrl}/${channel}`, options));
    }

    GetById(channel, id){
        if(!channel || !id)
            throw new Error("Invalid arguments");

        const options = {
            method: "GET",
            mode: "cors",
        };

        return this._PromiseToJsonOrError(window.fetch(`${this.rootUrl}/${channel}/${id}`, options));
    }

    Post(channel, data){
        if(!channel || !data)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "POST",
            mode: "cors",
            headers,
            body: (typeof data === "string" ? data : JSON.stringify(data))
        };
        var urlEndPoint = `${this.rootUrl}/${channel}`;
        console.log(`Post request to ${urlEndPoint} with length ${options.body.length}, KB`);
        return this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
    }

    Put(channel, id, data){
        if(!channel || !id || !data)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "Put",
            mode: "cors",
            headers,
            body: (typeof data === "string" ? data : JSON.stringify(data))
        };

        return this._PromiseToJsonOrError(window.fetch(`${this.rootUrl}/${channel}/${id}`, options));
    }

    Delete(channel, id){
        if(!channel || !id)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "Delete",
            mode: "cors",
            headers
        };

        return this._PromiseToJsonOrError(window.fetch(`${this.rootUrl}/${channel}/${id}`, options));
    }

    //PRIVATE
    _PromiseToJsonOrError(promise){
        return promise.then(res=>{
                if(res.ok)
                    return res.json();
                else
                    throw new Error(res.statusText);
            });
    }
}

export default new PostmanService(config);