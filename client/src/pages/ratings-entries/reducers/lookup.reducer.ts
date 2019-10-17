import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface LookupState{
    competitions: Models.Competition[],
    records: Models.Record[],
    names: string[],
    divisions: Models.Division[],
    compTypes: Models.CompetitionType[],
    regions: Models.Region[],
    coaches: string[],
    fstList: string[],
    schools: string[],
    ratingTypes?: Models.RatingType[]
}

const defaultState = {
    competitions: [],
    records: [],
    names: [],
    divisions: [{name: "Open", displayName: "Відкритий"}, {name: "Junior", displayName: "Юніори"}, {name: "SubJunior", displayName: "Юнаки"}],
    compTypes: [],
    regions: [],
    coaches: [],
    fstList: [],
    schools: [],
    ratingTypes: []
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
        case ActionTypes.LOAD_NAMES: {
            let payload = action.payload as ActionTypes.LOAD_NAMES_PAYLOAD;
            return {
                ...state,
                names: payload
            }
        }
        case ActionTypes.LOAD_COMP_TYPES: {
            let payload = action.payload as ActionTypes.LOAD_COMP_TYPES_PAYLOAD;
            return {
                ...state,
                compTypes: payload
            }
        }
        case ActionTypes.LOAD_REGIONS: {
            let payload = action.payload as ActionTypes.LOAD_REGIONS_PAYLOAD;
            return {
                ...state,
                regions: payload
            }
        }
        case ActionTypes.LOAD_COACHES: {
            let payload = action.payload as ActionTypes.LOAD_COACHES_PAYLOAD;
            return {
                ...state,
                coaches: payload
            }
        }
        case ActionTypes.LOAD_FST: {
            let payload = action.payload as ActionTypes.LOAD_FST_PAYLOAD;
            return {
                ...state,
                fstList: payload
            }
        }
        case ActionTypes.LOAD_SCHOOLS: {
            let payload = action.payload as ActionTypes.LOAD_SCHOOLS_PAYLOAD;
            return {
                ...state,
                schools: payload
            }
        }
        case ActionTypes.LOAD_RATING_TYPES: {
            let payload = action.payload as ActionTypes.LOAD_RATING_TYPES_PAYLOAD
            return {
                ...state,
                ratingTypes: payload
            }
        }
        default:
            return state;
    }
}