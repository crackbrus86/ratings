import * as Models from "../models/index.models";

export const CHANGE_START_TIME = "SHELL::CHANGE_START_TIME";
export type CHANGE_START_TIME_PAYLOAD = Date;

export const LOAD_COMPETITIONS = "LOOKUP::LOAD_COMPETITIONS";
export interface LOAD_COMPETITIONS_PAYLOAD {
    competitions: Models.Competition[]
}

export const LOAD_RECORDS = "LOOKUP::LOAD_RECORDS";
export interface LOAD_RECORDS_PAYLOAD {
    records: Models.Record[]
}

export const OPEN_ENTRY = "ENTRIES::OPEN_ENTRY";
export type OPEN_ENTRY_PAYLOAD = Models.Entry;

export const CLOSE_ENTRY = "ENTRIES::CLOSE_ENTRY";