import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface RatingEntryState{
    entries: Models.RatingEntry[]
}

const defaultState = {
    entries: []
} as RatingEntryState

export type ReducerState = typeof defaultState;

export const ratingEntryReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_RATING_ENTRIES: {
            let payload = action.payload as ActionTypes.LOAD_RATING_ENTRIES_PAYLOAD;
            return {
                ...state,
                entries: payload
            }
        }
        case ActionTypes.EMPTY_RATING_ENTRIES: {
            return {
                ...state,
                entries: []
            }
        }
        default: 
            return state
    }
}