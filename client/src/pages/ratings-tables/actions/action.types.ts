import * as Models from "../models/index.models";

export const CHANGE_RATING = "SHELL::CHANGE_RATING";
export type CHANGE_RATING_PAYLOAD = string;

export const LOAD_RATINGS = "LOOKUP::LOAD_RATINGS";
export type LOAD_RATINGS_PAYLOAD = Models.Rating[];

export const LOAD_RATING_ENTRIES = "RATINGS::LOAD_RATING_ENTRIES";
export type LOAD_RATING_ENTRIES_PAYLOAD = Models.RatingEntry[];

export const EMPTY_RATING_ENTRIES = "RATINGS::EMPTY_RATING_ENTRIES";

export const OPEN_ENTRY_DETAILS = "RATINGS::OPEN_ENTRY_DETAILS"
export type OPEN_ENTRY_DETAILS_PAYLOAD = Models.RatingEntry

export const CLOSE_ENTRY_DETAILS = "RATINGS::CLOSE_ENTRY_DETAILS"

export const LOAD_COMPETITIONS = "LOOKUP::LOAD_COMPETITIONS"
export type LOAD_COMPETITIONS_PAYLOAD = Models.Competition[]

export const LOAD_COMPETITION_TYPES = "LOOKUP::LOAD_COMPETITION_TYPES"
export type LOAD_COMPETITION_TYPES_PAYLOAD = Models.CompetitionType[]

export const LOAD_RECORDS = "LOOKUP::LOAD_RECORDS"
export type LOAD_RECORDS_PAYLOAD = Models.Record[]