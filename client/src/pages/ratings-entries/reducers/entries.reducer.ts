import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface EntriesState {
    entries: Models.Entry[],
    currentEntry: Models.Entry,
    deleteById: number
}

const defaultState = {
    entries: [],
    currentEntry: null,
    deleteById: null
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
        case ActionTypes.UPDATE_ENTRY: {
            let payload = action.payload as ActionTypes.UPDATE_ENTRY_PAYLOAD;
            return {
                ...state,
                currentEntry: {
                    ...state.currentEntry,
                    [payload.field]: payload.value
                }
            }
        }
        case ActionTypes.LOAD_ENTRIES: {
            let payload = action.payload as ActionTypes.LOAD_ENTRIES_PAYLOAD;
            return {
                ...state,
                entries: payload.entries
            }
        }
        case ActionTypes.SELECT_TO_REMOVE: {
            let payload = action.payload as ActionTypes.SELECT_TO_REMOVE_PAYLOAD;
            return {
                ...state,
                deleteById: payload.id
            }
        }
        case ActionTypes.CANCEL_REMOVE: {
            return {
                ...state,
                deleteById: null
            }
        }
        default:
            return state
    }
}