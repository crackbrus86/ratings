import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface ShellState{
    rating: string
    startDate: Date
}

const defaultState = {
    rating: null,
    startDate: new Date()
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
        case ActionTypes.CHANGE_START_DATE: {
            return {
                ...state,
                startDate: action.payload as ActionTypes.CHANGE_START_DATE_PAYLOAD
            }
        }
        default: 
            return state
    }
}