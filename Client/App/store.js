import appReducer from "./reducer.js";
import {createStore, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();

delete window.__REDUX_DEVTOOLS_EXTENSION__;//Если надо отключить девтулс по бырому

export default window.appStore = createStore(
    appReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : applyMiddleware(thunkMiddleware)
);