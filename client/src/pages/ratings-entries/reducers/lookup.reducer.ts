import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface LookupState{
    competitions: Models.Competition[],
    records: Models.Record[]
}

const defaultState = {
    competitions: [],
    records: []
} as LookupState

export type ReducerState = typeof defaultState;

export const lookupReducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_COMPETITIONS: {
            let payload = action.payload as ActionTypes.LOAD_COMPETITIONS_PAYLOAD;
            return {
                ...state,
                competitions: payload.competitions
            }
        }
        case ActionTypes.LOAD_RECORDS: {
            let payload = action.payload as ActionTypes.LOAD_RECORDS_PAYLOAD;
            return {
                ...state,
                records: payload.records
            }
        }
        default:
            return state;
    }
}