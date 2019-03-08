import * as Models from "../models/index.models";
import { Action } from "redux";
import * as ActionTypes from "../actions/action.types";

export interface LookupState{
    competitions: Models.LookupModels.Competition[],
    records: Models.LookupModels.Record[],
    points: Models.LookupModels.Point[]
}

const defaultState = {
    competitions: [],
    records: [],
    points: []
} as LookupState;

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
        case ActionTypes.LOAD_POINTS: {
            let payload = action.payload as ActionTypes.LOAD_POINTS_PAYLOAD;
            return {
                ...state,
                points: payload.points
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