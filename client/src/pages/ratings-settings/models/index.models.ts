import { ResponseModel } from "../../../infrastructure/call.api";
import { ThunkAction } from "../../../infrastructure/models";
export import LookupModels = require("./lookup.models");
import * as RangeModels from "./range.models";
import { ReducerState } from "../reducers/index.reducer";

export type Competition = LookupModels.Competition;
export type CompType = LookupModels.CompType;
export type UPFRange = RangeModels.Range;

export type StoreState = ReducerState;

export interface Range{
    comp: string,
    name: string,
    sortOrder?: number,
    place: number,
    compType?: string,
    compTypeName?: string,
    rangeValue?: number
}