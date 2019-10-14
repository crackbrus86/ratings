import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface LookupState{
    ratings: Models.Rating[],
    competitions?: Models.Competition[],
    competitionTypes?: Models.CompetitionType[],
    records?: Models.Record[]
}

const defaultState = {
    ratings: [],
    competitions: [],
    competitionTypes: [],
    records: []
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
        case ActionTypes.LOAD_COMPETITIONS: {
            let payload = action.payload as ActionTypes.LOAD_COMPETITIONS_PAYLOAD
            return {
                ...state,
                competitions: payload
            }
        }
        case ActionTypes.LOAD_COMPETITION_TYPES: {
            let payload = action.payload as ActionTypes.LOAD_COMPETITION_TYPES_PAYLOAD
            return {
                ...state,
                competitionTypes: payload
            }
        }
        case ActionTypes.LOAD_RECORDS: {
            let payload = action.payload as ActionTypes.LOAD_RECORDS_PAYLOAD
            return {
                ...state,
                records: payload
            }
        }
        default: 
            return state
    }
}