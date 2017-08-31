import appReducer from "./appReducer.js";
import {createStore} from "redux";

export default window.appStore = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());