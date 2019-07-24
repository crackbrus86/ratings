import * as Models from "../models/index.models";
import * as ActionTypes from "../actions/action.types";

export interface RefereeSettingReducerState{
    settings: Models.RefereeSetting[],
    selectedSetting?: Models.RefereeSetting
}

export const defaultState: RefereeSettingReducerState = {
    settings: [],
    selectedSetting: null
}

export type ReducerState = typeof defaultState;

export const refereeSettingReducer = (state = defaultState, action): RefereeSettingReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_REFEREE_SETTINGS: {
            let payload = action.payload as ActionTypes.LOAD_REFEREE_SETTINGS_PAYLOAD;
            return {
                ...state,
                settings: payload
            }
        }
        default:
            return state;
    }
}