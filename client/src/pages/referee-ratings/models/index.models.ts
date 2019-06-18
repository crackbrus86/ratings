import { ResponseModel } from "../../../infrastructure/call.api";
import { ThunkAction } from "../../../infrastructure/models";
import * as TestModels from "./test.models";
import { ReducerState } from "../reducers/index.reducer";

export type TestRefereeEntry = TestModels.TestRefereeEntry;

export type StoreState = ReducerState;