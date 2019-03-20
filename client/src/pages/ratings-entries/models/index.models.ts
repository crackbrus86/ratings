export import EntryModels = require("./entry.models");
export import LookupModels = require("./lookup.models");

import {ReducerState} from "../reducers/index.reducer";

export type StoreState = ReducerState;

export type Competition = LookupModels.Competition;
export type Record = LookupModels.Record;
export type Entry = EntryModels.RatingEntry;