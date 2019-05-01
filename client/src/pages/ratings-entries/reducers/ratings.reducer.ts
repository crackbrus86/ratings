import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface RatingsState{
    ministryRatings: Models.Rating[],
    upfRatings: Models.Rating[],
    ministryCoachRatings: Models.Rating[],
    upfCoachRatings: Models.Rating[]
}

const defaultState = {
    ministryRatings: [],
    upfRatings: [],
    ministryCoachRatings: [],
    upfCoachRatings: []
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
        case ActionTypes.LOAD_UPF_RATINGS: {
            let payload = action.payload as ActionTypes.LOAD_UPF_RATINGS_PAYLOAD;
            return {
                ...state,
                upfRatings: payload
            }
        }
        case ActionTypes.LOAD_MINISTRY_COACH_RATINGS: {
            let payload = action.payload as ActionTypes.LOAD_MINISTRY_COACH_RATINGS_PAYLOAD;
            return {
                ...state,
                ministryCoachRatings: payload
            }
        }
        case ActionTypes.LOAD_UPF_COACH_RATINGS: {
            let payload = action.payload as ActionTypes.LOAD_UPF_COACH_RATINGS_PAYLOAD;
            return {
                ...state,
                upfCoachRatings: payload
            }
        }
        default:
            return state
    }
}