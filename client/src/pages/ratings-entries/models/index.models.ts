export import EntryModels = require("./entry.models");
export import LookupModels = require("./lookup.models");
export import RatingModels = require("./rating.models");
import {ValidationResult} from "../../../infrastructure/models";

import {ReducerState} from "../reducers/index.reducer";

export type StoreState = ReducerState;

export type Competition = LookupModels.Competition;
export type Record = LookupModels.Record;
export type Entry = EntryModels.RatingEntry;
export type ValidationResult = ValidationResult;
export type Rating = RatingModels.Rating;

export enum EntryType{
    Place = "place",
    Record = "record"
}