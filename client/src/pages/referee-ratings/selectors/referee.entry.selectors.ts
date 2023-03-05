import { createSelector } from "reselect"
import * as Models from "../models/index.models"

const entries = (state: Models.StoreState) => state.refereeEntries.entries
const allEvents = (state: Models.StoreState) => state.lookup.allEvents
const activities = (state: Models.StoreState) => state.lookup.activities

export const getTableEntries = createSelector(entries, allEvents, activities, (entries, events, activities) => {
    return entries.map(x => {
        let event = events.find(e => e.dbName == x.event)
        let activity = activities.find(a => a.id == x.activity)
        return {...x, eventName: !!event ? event.name : null, activityName: !!activity ? activity.activity : null} as Models.ExtendedEntry
    })
})