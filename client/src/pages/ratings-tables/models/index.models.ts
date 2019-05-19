export import RatingModels = require("./rating.models");
import {SelectOption} from "../../../components/form/select";

import {ReducerState} from "../reducers/index.reducer";

export type StoreState = ReducerState;

export type Rating = RatingModels.Rating;
export type RatingEntry = RatingModels.RatingEntry;

export type SelectOption = SelectOption;