import {combineReducers} from "redux";

import TagDomain from "./tagDomain.js";
import TupleDomain from "./tupleDomain.js";
import GoloDomain from "./goloDomain.js";
import InstReducer from "./instReducer.js";
import SuccessInformerReducer from "./successInformer.js";
import DesignerReducer from "./designerDomain.js";
import BureauDomain from "./bureauDomain.js";

export default combineReducers({
    tagDomain: TagDomain,
    tupleDomain: TupleDomain,
    goloDomain: GoloDomain,
    instList: InstReducer,
    successInformer: SuccessInformerReducer,
    designerDomain: DesignerReducer,
    bureauDomain: BureauDomain,
});