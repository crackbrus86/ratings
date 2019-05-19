import {combineReducers} from "redux";

export import Shell = require("./shell.reducer");
export import Lookups = require("./lookup.reducer");
export import Entries = require("./rating.entry.reducer");

export interface ReducerState{
    lookups: Lookups.ReducerState,
    shell: Shell.ReducerState,
    entries: Entries.ReducerState
}

export const reducer = combineReducers({
    lookups: Lookups.lookupReducer,
    shell: Shell.shellReducer,
    entries: Entries.ratingEntryReducer
});