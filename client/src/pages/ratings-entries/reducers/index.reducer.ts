import {combineReducers} from "redux";
import * as Models from "../models/index.models";

export import Shell = require("./shell.reducer");
export import Lookup = require("./lookup.reducer");

export interface ReducerState{
    shell: Shell.ReducerState,
    lookup: Lookup.ReducerState
}

export const reducer = combineReducers({
    shell: Shell.shellReducer,
    lookup: Lookup.lookupReducer
});