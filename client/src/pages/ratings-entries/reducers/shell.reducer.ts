import * as ActionTypes from "../actions/action.types";

export interface ShellState{
    startDate: Date
}

const defaultState = {
    startDate: new Date(new Date().getFullYear(), 0, 1)
} as ShellState

export type ReducerState = typeof defaultState;

export const shellReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.CHANGE_START_TIME:
            let payload = action.payload as ActionTypes.CHANGE_START_TIME_PAYLOAD;
            return {
                ...state,
                startDate: payload
            }
        default:
            return state
    }
}