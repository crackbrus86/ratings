import { ResponseModel } from "../../../infrastructure/call.api";
import { ThunkAction } from "../../../infrastructure/models";
export import LookupModels = require("./lookup.models");
import { ReducerState } from "../reducers/index.reducer";

export type Response = ResponseModel;
export type StoreState = ReducerState;