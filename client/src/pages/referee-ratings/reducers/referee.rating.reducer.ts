import * as Models from "../models/index.models"
import * as ActionTypes from "../actions/types/action.types"

interface State{
    ratings?: Models.Rating[]
}

const defaultState: State = {
    ratings: []
}

export type ReducerState = typeof defaultState;

export const reducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_RATING: {
            let payload = action.payload as ActionTypes.LOAD_RATING_PAYLOAD
            return {
                ...state,
                ratings: payload
            }
        }
        default:
            return state
    }
}