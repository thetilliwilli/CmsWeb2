import * as at from "../App/at.js";
import initState from "../App/initState.js";
import util from "../Module/util.js";
import uuid from "uuid/v4";

function CloneState(oldState, callback){
    var newState = util.DeepCopy(oldState);
    callback(newState);
    return newState;
}

/** state = AppState.overseer */
export default function OverseerReducer(state = initState.overseer, action){
    switch(action.type)
    {
        case at.FETCH_OVERSEER_RESPONSE: return CloneState(state, newState => {
            newState.serverTime = action.payload.serverTime;
            newState.statuses = InstListToOverseer(action.payload.statuses, action.payload.serverTime);
        });

        //DEFAULT    
        default: return state;
    }
}

/**
 * @typedef InstStatus
 * @property {Date} uptime
 * @property {String} id
 * @property {String} hardname
 * @property {String} desc
 * 
 */

/**
 * 
 * @param {Array<InstStatus>} statuses статусы приложений
 */ 
function InstListToOverseer(statuses, serverTime){
    var result = [];

    var typeReducer = (acc, curr) => {
        acc[curr.type] = true;
        return acc;
    };

    var instTypes = statuses.reduce(typeReducer, {});

    for(var type in instTypes)
    {
        result.push({
            type: type,
            statuses: [],
        });
    }

    statuses.forEach(status => {
        result.find(i=>i.type===status.type).statuses.push({
            id: status.id,
            hardname: status.hardname,
            desc: status.desc,
            uptime: status.uptime,
            lastPing: (new Date(serverTime) - new Date(status.uptime)),//milliseconds
            status: TimeToStatus(serverTime, status.uptime, status),
        });
    });

    return result;
}

function TimeToStatus(serverTime, uptime, inst){
    var timediff = (new Date(serverTime) - new Date(uptime));//milliseconds
    if(timediff<0)
        throw new Error(`Неправильно установлено время.
        Либо на сервере, либо на одном из устроств неправильно установлено время.
        Проверьте устройство с hardname: ${inst.hardname}`);
    else
        if(0<=timediff && timediff<2000*60)
            return "ok";
        else
            if(2000*60 <=timediff && timediff<5000*60)
                return "poor";
            else
                if(5000*60 <=timediff)
                    return "alert";

    throw new Error("Не предусмотренный кейс в TimeToStatus");
}