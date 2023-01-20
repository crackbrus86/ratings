export import RatingModels = require("./rating.models");
import {SelectOption} from "../../../components/form/select";
import * as LookupModels from "./lookup.models"

import {ReducerState} from "../reducers/index.reducer";

export type StoreState = ReducerState;

export type Rating = RatingModels.Rating;
export type RatingEntry = RatingModels.RatingEntry;

export { SelectOption };
export type Competition = LookupModels.Competition
export type CompetitionType = LookupModels.CompetitionType
export type Record = LookupModels.Record