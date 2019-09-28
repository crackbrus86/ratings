import { combineReducers } from "redux"

import RefereeEntryReducer = require("./referee.entry.reducer")
import ShellReducer = require("./shell.reducer")
import * as Lookup from "./lookup.reducer"
import * as Rating from "./referee.rating.reducer"

export interface ReducerState{
    refereeEntries: RefereeEntryReducer.ReducerState,
    shell: ShellReducer.ReducerState,
    lookup: Lookup.ReducerState,
    rating: Rating.ReducerState
}

export const reducer = combineReducers({
    refereeEntries: RefereeEntryReducer.reducer,
    shell: ShellReducer.reducer,
    lookup: Lookup.reducer,
    rating: Rating.reducer
});