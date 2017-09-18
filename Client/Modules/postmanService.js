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
        // console.log(`Get request to ${urlEndPoint} with length ${options.body.length}, KB`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
    }

    GetById(channel, actionCreator, id){
        if(!channel || !id)
            throw new Error("Invalid arguments");

        const options = {
            method: "GET",
            mode: "cors",
        };

        var urlEndPoint = `${this.rootUrl}/${channel}/${id}`;
        // console.log(`Post request to ${urlEndPoint} with length ${options.body.length}, KB`);
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
        console.log(`Post request to ${urlEndPoint} with length ${options.body.length}, KB`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
    }

    Put(channel, actionCreator, id, data){
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

        var urlEndPoint = `${this.rootUrl}/${channel}/${id}`;
        // console.log(`Post request to ${urlEndPoint} with length ${options.body.length}, KB`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
    }

    Delete(channel, actionCreator, id){
        if(!channel || !id)
            throw new Error("Invalid arguments");

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const options = {
            method: "Delete",
            mode: "cors",
            headers
        };

        var urlEndPoint = `${this.rootUrl}/${channel}/${id}`;
        console.log(`Post request to ${urlEndPoint} with length ${options.body.length}, KB`);
        let jsonOrError = this._PromiseToJsonOrError(window.fetch(urlEndPoint, options));
        return this._DispatchCallbackAction(jsonOrError, actionCreator);
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
                this.Dispatch(actionCreator(json))
            })
            .catch(error => {
                console.error(`Попытка запроса на сервер не удалась: ${error}`);
                this.Dispatch(actionCreator({error}))
            });
    }
}

export default new PostmanService(config, store);