import * as Models from "../models/index.models";

export const LOAD_COMPETITIONS = "LOAD_COMPETITIONS";
export interface LOAD_COMPETITIONS_PAYLOAD {
    competitions: Models.LookupModels.Competition[]
}

export const LOAD_POINTS = "LOAD_POINTS";
export interface LOAD_POINTS_PAYLOAD {
    points: Models.LookupModels.Point[]
}

export const LOAD_RECORDS = "LOAD_RECORDS";
export interface LOAD_RECORDS_PAYLOAD {
    records: Models.LookupModels.Record[]
}

export const LOAD_COMP_TYPES = "LOAD_COMP_TYPES";
export type LOAD_COMP_TYPES_PAYLOAD = Models.CompType[];