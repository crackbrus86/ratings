import * as Models from "../models/index.models"
import * as ActionTypes from "../actions/types/action.types"

interface State{
    activities: Models.Activity[],
    events: Models.Event[],
    allEvents: Models.Event[],
    names?: string[],
    ratingTypes?: Models.RatingType[]
}

const defaultState: State = {
    activities: [],
    events: [],
    allEvents: [],
    names: [],
    ratingTypes: []
}

export type ReducerState = typeof defaultState;

export const reducer = (state = defaultState, action): ReducerState => {
    switch(action.type){
        case ActionTypes.LOAD_ACTIVITIES:{
            let payload = action.payload as ActionTypes.LOAD_ACTIVITIES_PAYLOAD
            return {
                ...state,
                activities: payload
            }
        }
        case ActionTypes.LOAD_EVENTS:{
            let payload = action.payload as ActionTypes.LOAD_EVENTS_PAYLOAD
            return {
                ...state,
                events: payload
            }
        }
        case ActionTypes.LOAD_ALL_EVENTS: {
            let payload = action.payload as ActionTypes.LOAD_ALL_EVENTS_PAYLOAD
            return {
                ...state,
                allEvents: payload
            }
        }
        case ActionTypes.LOAD_NAMES:{
            let payload = action.payload as ActionTypes.LOAD_NAMES_PAYLOAD
            return {
                ...state,
                names: payload
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
            return state
    }
}