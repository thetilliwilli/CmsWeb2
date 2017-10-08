import {combineReducers} from "redux";

import TagDomain from "./tagDomain.js";
import TupleDomain from "./tupleDomain.js";

export default combineReducers({
    tagDomain: TagDomain,
    tupleDomain: TupleDomain,
});