import * as Models from "../models/index.models"
import * as ActionTypes from "../actions/types/action.types"

interface State{
    entries: Models.RefereeEntry[],
    selectedEntry: Models.RefereeEntry
    deleteById?: number
}

const defaultState: State = {
    entries: [],
    selectedEntry: null,
    deleteById: null
}

export type ReducerState = typeof defaultState;

export const reducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_REFEREE_ENTRIES: {
            let payload = action.payload as ActionTypes.LOAD_REFEREE_ENTRIES_PAYLOAD
            return {
                ...state,
                entries: payload
            }
        }
        case ActionTypes.SELECT_REFEREE_ENTRY: {
            let payload = action.payload as ActionTypes.SELECT_REFEREE_ENTRY_PAYLOAD
            return {
                ...state,
                selectedEntry: payload
            }
        }
        case ActionTypes.CLOSE_REFEREE_ENTRY: {
            return {
                ...state,
                selectedEntry: null
            }
        }
        case ActionTypes.SELECT_TO_REMOVE: {
            let payload = action.payload as ActionTypes.SELECT_TO_REMOVE_PAYLOAD
            return {
                ...state,
                deleteById: payload
            }
        }
        case ActionTypes.CANCEL_REMOVE: {
            return {
                ...state,
                deleteById: null
            }
        }
        default:
            return state
    }
}