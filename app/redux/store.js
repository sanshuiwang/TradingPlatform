import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducers.js";
// Logger with default options
import logger from "redux-logger";
import promiseMiddleware from './middleware/promiseMiddleware';

let store = process.env.NODE_ENV === "development"
    ? createStore(combineReducers, applyMiddleware(promiseMiddleware,logger))
    : createStore(combineReducers, applyMiddleware(promiseMiddleware));

if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextCombineReducers = require("./reducers").default;
        store.replaceReducer(nextCombineReducers);
    });
}    

export default store;
