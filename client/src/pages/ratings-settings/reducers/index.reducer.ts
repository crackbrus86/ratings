import { combineReducers } from "redux";
import * as Models from "../models/index.models";

export import Lookup = require("./lookup.reducer");
export import Ranges = require("./range.reducer");
export import RefereeSetting = require("./referee.setting.reducer")

export interface ReducerState{
    lookup: Lookup.ReducerState,
    ranges: Ranges.RangeState,
    refereeSettings: RefereeSetting.RefereeSettingReducerState
}

export const reducer = combineReducers<Models.StoreState>({
    lookup: Lookup.lookupReducer,
    ranges: Ranges.rangesReducer,
    refereeSettings: RefereeSetting.refereeSettingReducer
});