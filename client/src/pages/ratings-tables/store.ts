import { createStore, applyMiddleware } from "redux";
import {logger} from "redux-logger";
import thunk from "redux-thunk";
import * as Reducers from "./reducers/index.reducer";

export function createRatingsStore(){
    return createStore(Reducers.reducer, applyMiddleware(thunk, logger));
}