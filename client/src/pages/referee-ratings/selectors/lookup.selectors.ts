import {createSelector} from "reselect"
import * as Models from "../models/index.models"
import {SelectOption} from "../../../components/form/select"

const activities = (state: Models.StoreState) => state.lookup.activities
const events = (state: Models.StoreState) => state.lookup.events

export const eventsList = createSelector(events, (events) => {
    return [{text: "", value: null}].concat(events.map(event => ({ text: event.name, value: event.dbName }) as SelectOption))
})

export const activitiesList = createSelector(activities, (activities) => {
    return [{text: "", value: null}].concat(activities.map(a => ({ text: a.activity, value: a.id }) as SelectOption))
})