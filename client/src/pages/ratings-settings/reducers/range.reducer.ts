import * as Models from "../models/index.models";
import { Action } from "redux";
import * as ActionTypes from "../actions/action.types";

export interface RangeState{
    ranges: Models.UPFRange[]
}

const defaultState = {
    ranges: []
} as RangeState;

export type ReducerState = typeof defaultState;

export const rangesReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_RANGES: {
            let payload = action.payload as ActionTypes.LOAD_RANGES_PAYLOAD;
            return {
                ...state,
                ranges: payload
            }
        }
        default:
            return state;
    }
}