import {combineReducers} from "redux";

import TagDomain from "./tagDomain.js";
import WikiDomain from "./wikiDomain.js";

export default combineReducers({
    tagDomain: TagDomain,
    wikiDomain: WikiDomain,
});