import * as Models from "../../models/index.models";

export const LOAD_TEST_ENTRIES = "TEST::LOAD_ENTRIES";
export type LOAD_TEST_ENTRIES_PAYLOAD = Models.TestRefereeEntry[];

export const LOAD_REFEREE_SETTINGS = "REFEREE_SETTINGS::LOAD"
export type LOAD_REFEREE_SETTINGS_PAYLOAD = Models.RefereeSetting[]

export const SELECT_REFEREE_SETTING = "REFEREE_SETTINGS::SELECT"
export type SELECT_REFEREE_SETTING_PAYLOAD = Models.RefereeSetting