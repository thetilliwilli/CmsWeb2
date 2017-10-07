import appReducer from "../Reducer/index.js";
import {createStore, applyMiddleware, compose} from "redux";
import {createLogger} from "redux-logger";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();

// delete window.__REDUX_DEVTOOLS_EXTENSION__;//Если надо отключить девтулс по бырому

export default window.appStore = createStore(
    appReducer,
    compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
);