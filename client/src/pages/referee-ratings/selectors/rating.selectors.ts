import { createSelector } from "reselect"
import * as Models from "../models/index.models"
import {getDetails} from "../../../utils/utils"

const ratings = (state: Models.StoreState) => state.rating.ratings
const competitions = (state: Models.StoreState) => state.lookup.events

export const refereeRatings = createSelector(ratings, competitions, (ratings, competitions) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, [], competitions, [], true)}));
})