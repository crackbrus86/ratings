import {combineReducers} from "redux";

export import Shell = require("./shell.reducer");
export import Lookup = require("./lookup.reducer");
export import Entries = require("./entries.reducer");

export interface ReducerState{
    shell: Shell.ReducerState,
    lookup: Lookup.ReducerState,
    entries: Entries.ReducerState
}

export const reducer = combineReducers({
    shell: Shell.shellReducer,
    lookup: Lookup.lookupReducer,
    entries: Entries.entriesReducer
});