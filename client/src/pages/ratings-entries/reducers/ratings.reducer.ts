import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface RatingsState{
    upfRatings: Models.Rating[]
}

const defaultState = {
    upfRatings: []
} as RatingsState

export type ReducerState = typeof defaultState;

export const ratingsReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_UPF_RATINGS: {
            let payload = action.payload as ActionTypes.LOAD_UPF_RATINGS_PAYLOAD;
            return {
                ...state,
                upfRatings: payload
            }
        }
        default:
            return state
    }
}