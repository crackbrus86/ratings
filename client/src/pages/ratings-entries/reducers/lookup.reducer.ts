import * as ActionTypes from "../actions/action.types";
import * as Models from "../models/index.models";

export interface LookupState{
    competitions: Models.Competition[],
    records: Models.Record[],
    names: string[],
    divisions: Models.Division[],
    compTypes: Models.CompetitionType[]
}

const defaultState = {
    competitions: [],
    records: [],
    names: [],
    divisions: [{name: "Open", displayName: "Відкритий"}, {name: "Junior", displayName: "Юніори"}, {name: "SubJunior", displayName: "Юнаки"}],
    compTypes: [{name: "PL", displayName: "Пауерліфтинг"}, {name: "CPL", displayName: "Класичний Пауерліфтинг"}, {name: "BP", displayName: "Жим"}, {name: "CBP", displayName: "Класичний Жим"}]
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
        default:
            return state;
    }
}