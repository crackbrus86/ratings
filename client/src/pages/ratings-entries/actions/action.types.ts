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

export const UPDATE_ENTRY = "ENTRIES::UPDATE_ENTRY";
export type UPDATE_ENTRY_PAYLOAD = {
    field: keyof Models.Entry,
    value: any
}

export const LOAD_ENTRIES = "ENTRIES::LOAD_ENTRIES";
export type LOAD_ENTRIES_PAYLOAD = {
    entries: Models.Entry[]
}

export const SELECT_TO_REMOVE = "ENTRIES::SELECT_TO_REMOVE";
export type SELECT_TO_REMOVE_PAYLOAD = {
    id: number
}

export const CANCEL_REMOVE = "ENTRIES::CANCEL_REMOVE";

export const LOAD_NAMES = "ENTRIES::LOAD_NAMES";
export type LOAD_NAMES_PAYLOAD = string[]

export const LOAD_UPF_RATINGS = "RATINGS::LOAD_UPF_RATINGS";
export type LOAD_UPF_RATINGS_PAYLOAD = Models.Rating[]