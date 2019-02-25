import * as Models from "../models/index.models";

export const LOAD_COMPETITIONS = "LOAD_COMPETITIONS";
export interface LOAD_COMPETITIONS_PAYLOAD {
    competitions: Models.LookupModels.Competition[]
}

export const LOAD_POINTS = "LOAD_POINTS";
export interface LOAD_POINTS_PAYLOAD {
    points: Models.LookupModels.Point[]
}