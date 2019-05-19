import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface ShellState{
    rating: string
}

const defaultState = {
    rating: null
} as ShellState

export type ReducerState = typeof defaultState;

export const shellReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.CHANGE_RATING: {
            let payload = action.payload as ActionTypes.CHANGE_RATING_PAYLOAD;
            return {
                ...state,
                rating: payload
            }
        }
        default: 
            return state
    }
}