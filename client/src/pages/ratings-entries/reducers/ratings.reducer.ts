import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface RatingsState{
    ministryRatings: Models.Rating[]
}

const defaultState = {
    ministryRatings: []
} as RatingsState

export type ReducerState = typeof defaultState;

export const ratingsReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_MINISTRY_RATINGS: {
            let payload = action.payload as ActionTypes.LOAD_MINISTRY_RATINGS_PAYLOAD;
            return {
                ...state,
                ministryRatings: payload
            }
        }
        default:
            return state
    }
}