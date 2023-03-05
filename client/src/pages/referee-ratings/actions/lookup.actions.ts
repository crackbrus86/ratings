import * as ActionTypes from "./types/action.types"
import * as Models from "../models/index.models"
import * as Services from "../services/index.servces"
import * as toastr from "toastr"
toastr.options.timeOut = 5000

export const loadLookups = () => (d) => {
    d(loadActivities())
    d(loadEvents())
    d(loadAllEvents())
    d(loadNames())
    d(loadRatingTypes())
}

const loadActivities = () => (d) => {
    Services.Lookup.getActivities().then(response => {
        if(response.status){
            d({
                type: ActionTypes.LOAD_ACTIVITIES,
                payload: response.data as ActionTypes.LOAD_ACTIVITIES_PAYLOAD
            })
        }else{
            toastr.error(response.message)
        }
    })
}

const loadEvents = () => (d) => {
    Services.Lookup.getCompetitions().then(response => {
        if(response.status){
            d({type: ActionTypes.LOAD_EVENTS, payload: response.data as ActionTypes.LOAD_EVENTS_PAYLOAD})
        }else{
            toastr.error(response.message)
        }
    })
}

const loadAllEvents = () => (d) => {
    Services.Lookup.getAllCompetitions().then(response => {
        if(response.status){
            d({type: ActionTypes.LOAD_ALL_EVENTS, payload: response.data as ActionTypes.LOAD_ALL_EVENTS_PAYLOAD})
        }else{
            toastr.error(response.message)
        }
    })
}

const loadNames = () => (d) => {
    Services.Lookup.getNames().then(response => {
        if(response.status){
            d({type: ActionTypes.LOAD_NAMES, payload: response.data as ActionTypes.LOAD_NAMES_PAYLOAD})
        }else{
            toastr.error(response.message)
        }
    })
}

export const loadRatingTypes = () => (d) => {
    Services.Lookup.getRatingTypes().then(response => {
        if(response.status){
            d({type: ActionTypes.LOAD_RATING_TYPES, payload: response.data as ActionTypes.LOAD_RATING_TYPES_PAYLOAD})
        }else{
            toastr.error(response.message)
        }
    })
}

