import { ReducerState } from "../reducers/index.reducer";
export import RefereeEntryModels = require("./referee.entry.models");
import * as Lookup from "./lookup.models"
import {ValidationResult} from "../../../infrastructure/models";

export type RefereeEntry = RefereeEntryModels.RefereeEntry;

export type StoreState = ReducerState;
export type Activity = Lookup.Activity;
export type Event = Lookup.Competition;
export {ValidationResult}