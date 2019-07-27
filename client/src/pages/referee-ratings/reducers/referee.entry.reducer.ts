import * as Models from "../models/index.models"
import * as ActionTypes from "../actions/types/action.types"

interface State{
    entries: Models.RefereeEntry[],
    selectedEntry: Models.RefereeEntry
}

const defaultState: State = {
    entries: [],
    selectedEntry: null
}

export type ReducerState = typeof defaultState;

export const reducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        default:
            return state
    }
}