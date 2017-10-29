import {combineReducers} from "redux";

import TagDomain from "./tagDomain.js";
import TupleDomain from "./tupleDomain.js";
import GoloDomain from "./goloDomain.js";
import InstReducer from "./instReducer.js";

export default combineReducers({
    tagDomain: TagDomain,
    tupleDomain: TupleDomain,
    goloDomain: GoloDomain,
    instList: InstReducer,
});