import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import * as Reducers from "./reducers/index.reducer";
import * as Models from "./models/index.models";

export function createSettingsStore(){
    return createStore(Reducers.reducer, applyMiddleware(thunk, logger));
}