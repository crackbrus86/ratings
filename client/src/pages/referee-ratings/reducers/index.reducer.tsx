import { combineReducers } from "redux";

import TestReducer = require("./test.reducer");

export interface ReducerState{
    test: TestReducer.ReducerState
}

export const reducer = combineReducers({
    test: TestReducer.testReducer
});