import { combineReducers } from "redux";
import * as Models from "../models/index.models";

export import Lookup = require("./lookup.reducer");

export interface ReducerState{
    lookup: Lookup.ReducerState
}

export const reducer = combineReducers<Models.StoreState>({
    lookup: Lookup.lookupReducer
});