import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface EntriesState {
    entries: Models.Entry[],
    currentEntry: Models.Entry
}

const defaultState = {
    entries: [],
    currentEntry: null
} as EntriesState

export type ReducerState = typeof defaultState;

export const entriesReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.OPEN_ENTRY: {
            let payload = action.payload as ActionTypes.OPEN_ENTRY_PAYLOAD;
            return {
                ...state,
                currentEntry: payload
            }
        }
        case ActionTypes.CLOSE_ENTRY: {
            return {
                ...state,
                currentEntry: null
            }
        }
        default:
            return state
    }
}