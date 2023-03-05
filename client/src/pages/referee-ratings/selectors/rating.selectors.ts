import { createSelector } from "reselect"
import * as Models from "../models/index.models"
import {getDetails} from "../../../utils/utils"

const ratings = (state: Models.StoreState) => state.rating.ratings
const allCompetitions = (state: Models.StoreState) => state.lookup.allEvents

export const refereeRatings = createSelector(ratings, allCompetitions, (ratings, competitions) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, [], competitions, [], true)}));
})