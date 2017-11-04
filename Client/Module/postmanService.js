import config from "./config.js";
import store from "../App/store";

class PostmanService
{
    constructor(config, store){
        if(!config || !store) throw new Error("Invalid config argument");
        this.rootUrl = config.api.rootUrl[config.api.rootUrl.length-1]==="/"?config.api.rootUrl.slice(0, -1):config.api.rootUrl;
        this.Dispatch = store.dispatch;
    }

    GetAll(channel, actionCreator){
        if(!channel)
            throw new Error("Invalid arguments");

        const options = {
            method: "GET",
            mode: "cors",
        };

        var urlEndPoint = `${this.rootUrl}/${channel}`;
        console.info(`[Request.GetAll]:(${urlEndPoint}):`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
    }

    GetById(channel, actionCreator, id){
        if(!channel || id === undefined)
            throw new Error("Invalid arguments");

        const options = {
            method: "GET",
            mode: "cors",
        };

        var urlEndPoint = `${this.rootUrl}/${channel}/${id}`;
        console.info(`[Request.GetById]:(${urlEndPoint}):`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
    }

    Post(channel, actionCreator, data){
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
        console.info(`[Request.Post]:(${urlEndPoint}):BodyLength ${(options.body.length/1024/1024).toFixed(1)}, MB`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
    }

    Put(channel, id, data, actionCreator){
        if(!channel || id === undefined || !data)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "Put",
            mode: "cors",
            headers,
            body: (typeof data === "string" ? data : JSON.stringify(data))
        };

        var urlEndPoint = `${this.rootUrl}/${channel}/${id}`;
        console.info(`[Request.Put]:(${urlEndPoint}):BodyLength ${(options.body.length/1024/1024).toFixed(1)}, MB`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
    }

    Delete(channel, actionCreator, id){
        if(!channel || id === undefined)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "Delete",
            mode: "cors",
            headers
        };

        var urlEndPoint = `${this.rootUrl}/${channel}/${id}`;
        console.info(`[Request.Delete]:(${urlEndPoint}):`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator, id);
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

    _DispatchCallbackAction(promise, actionCreator){
        return promise.then(json => {
                if(actionCreator)
                    this.Dispatch(actionCreator(json));
                return json;
            })
            .catch(error => {
                console.error(`Попытка запроса на сервер не удалась: ${error}`);
                if(actionCreator)
                    this.Dispatch(actionCreator({error}));
                return {error};
            });
    }
}

export default new PostmanService(config, store);