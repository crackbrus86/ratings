import { ResponseModel } from "../../../infrastructure/call.api";
import { ThunkAction } from "../../../infrastructure/models";
import * as TestModels from "./test.models";
export import RefereeSettingModels = require("./referee.setting")
import { ReducerState } from "../reducers/index.reducer";

export type TestRefereeEntry = TestModels.TestRefereeEntry;
export type RefereeSetting = RefereeSettingModels.RefereeSetting;

export type StoreState = ReducerState;