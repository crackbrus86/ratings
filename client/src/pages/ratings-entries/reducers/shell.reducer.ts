import * as ActionTypes from "../actions/action.types";

export interface ShellState{
    startDate: Date,
    searchValue: string
}

const defaultState = {
    startDate: new Date(new Date().getFullYear(), 0, 1),
    searchValue: ''
} as ShellState

export type ReducerState = typeof defaultState;

export const shellReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.CHANGE_START_TIME: {
            let payload = action.payload as ActionTypes.CHANGE_START_TIME_PAYLOAD;
            return {
                ...state,
                startDate: payload
            }
        }
        case ActionTypes.CHANGE_SEARCH_VALUE: {
            let payload = action.payload as ActionTypes.CHANGE_SEARCH_VALUE_PAYLOAD;
            return {
                ...state,
                searchValue: payload
            }
        }
        default:
            return state
    }
}