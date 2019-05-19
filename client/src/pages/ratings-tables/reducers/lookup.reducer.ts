import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface LookupState{
    ratings: Models.Rating[]
}

const defaultState = {
    ratings: []
} as LookupState

export type ReducerState = typeof defaultState;

export const lookupReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_RATINGS: {
            let payload = action.payload as ActionTypes.LOAD_RATINGS_PAYLOAD;
            return {
                ...state,
                ratings: payload
            }
        }
        default: 
            return state
    }
}