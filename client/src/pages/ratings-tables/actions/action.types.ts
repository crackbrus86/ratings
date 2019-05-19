import * as Models from "../models/index.models";

export const CHANGE_RATING = "SHELL::CHANGE_RATING";
export type CHANGE_RATING_PAYLOAD = string;

export const LOAD_RATINGS = "LOOKUP::LOAD_RATINGS";
export type LOAD_RATINGS_PAYLOAD = Models.Rating[];

export const LOAD_RATING_ENTRIES = "RATINGS::LOAD_RATING_ENTRIES";
export type LOAD_RATING_ENTRIES_PAYLOAD = Models.RatingEntry[];

export const EMPTY_RATING_ENTRIES = "RATINGS::EMPTY_RATING_ENTRIES";