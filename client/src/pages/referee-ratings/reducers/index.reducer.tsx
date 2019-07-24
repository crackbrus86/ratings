import { combineReducers } from "redux";

import TestReducer = require("./test.reducer");
import RefereeSettingReducer = require("../../ratings-settings/reducers/referee.setting.reducer")

export interface ReducerState{
    test: TestReducer.ReducerState,
    refereeSetting: RefereeSettingReducer.ReducerState
}

export const reducer = combineReducers({
    test: TestReducer.testReducer,
    refereeSetting: RefereeSettingReducer.refereeSettingReducer
});