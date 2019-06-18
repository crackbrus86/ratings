import * as Models from "../models/index.models";
import * as ActionTypes from "../actions/types/action.types";

export interface TestReducerState{
    refereeEntries: Models.TestRefereeEntry[]
}

export const defaultState: TestReducerState = {
    refereeEntries: []
}

export type ReducerState = typeof defaultState;

export const testReducer = (state = defaultState, action): TestReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_TEST_ENTRIES: {
            let payload = action.payload as ActionTypes.LOAD_TEST_ENTRIES_PAYLOAD;
            return {
                ...state,
                refereeEntries: payload
            }
        }
        default:
            return state;
    }
}