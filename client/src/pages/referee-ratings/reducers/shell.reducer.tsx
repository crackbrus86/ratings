import * as Models from "../models/index.models"
import * as ActionTypes from "../actions/types/action.types"

interface State{
    startDate: Date
}

const defaultState: State = {
    startDate: new Date()
}

export type ReducerState = typeof defaultState;

export const reducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.CHANGE_START_DATE:{
            return {
                ...state,
                startDate: action.payload
            }
        }
        default:
            return state
    }
}