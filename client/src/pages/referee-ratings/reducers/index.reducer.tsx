import { combineReducers } from "redux"

import RefereeEntryReducer = require("./referee.entry.reducer")
import ShellReducer = require("./shell.reducer")

export interface ReducerState{
    refereeEntries: RefereeEntryReducer.ReducerState,
    shell: ShellReducer.ReducerState
}

export const reducer = combineReducers({
    refereeEntries: RefereeEntryReducer.reducer,
    shell: ShellReducer.reducer
});