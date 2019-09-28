import { ReducerState } from "../reducers/index.reducer";
export import RefereeEntryModels = require("./referee.entry.models");
import * as Lookup from "./lookup.models"
import * as RefereeRating from "./referee.rating.models"
import {ValidationResult} from "../../../infrastructure/models";

export type RefereeEntry = RefereeEntryModels.RefereeEntry;

export type StoreState = ReducerState;
export type Activity = Lookup.Activity;
export type Event = Lookup.Competition;
export type Rating = RefereeRating.Rating;
export {ValidationResult}

export interface ExtendedEntry extends RefereeEntry{
    eventName?: string,
    activityName?: string
}

export interface ExtendedRating extends Rating{
    competition?: string
}