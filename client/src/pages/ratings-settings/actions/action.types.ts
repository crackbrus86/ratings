import * as Models from "../models/index.models";

export const LOAD_COMPETITIONS = "LOAD_COMPETITIONS";
export interface LOAD_COMPETITIONS_PAYLOAD {
    competitions: Models.LookupModels.Competition[]
}