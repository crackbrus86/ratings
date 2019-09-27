import * as Models from "../../models/index.models"

export const CHANGE_START_DATE = "SHELL::CHANGE_START_DATE"
export type CHANGE_START_DATE_PAYLOAD = Date

export const LOAD_REFEREE_ENTRIES = "REFEREE_ENTRIES::LOAD"
export type LOAD_REFEREE_ENTRIES_PAYLOAD = Models.RefereeEntry[]

export const SELECT_REFEREE_ENTRY = "REFEREE_ENTRIES::SELECT"
export type SELECT_REFEREE_ENTRY_PAYLOAD = Models.RefereeEntry

export const CLOSE_REFEREE_ENTRY = "REFEREE_ENTRIES::CLOSE"

export const LOAD_ACTIVITIES = "LOOKUP::LOAD_ACTIVITIES"
export type LOAD_ACTIVITIES_PAYLOAD = Models.Activity[]

export const LOAD_EVENTS = "LOOKUP::LOAD_EVENTS"
export type LOAD_EVENTS_PAYLOAD = Models.Event[]