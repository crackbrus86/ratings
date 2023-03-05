import {createSelector} from "reselect"
import * as Models from "../models/index.models"
import {sortUPFRating, getDetails} from "../../../utils/utils"

const ratings = (state: Models.StoreState) => state.entries.entries
const rating = (state: Models.StoreState) => state.shell.rating
const ratingTypes = (state: Models.StoreState) => state.lookups.ratings
const entryDetails = (state: Models.StoreState) => state.entries.entryDetails
const allCompetitions = (state: Models.StoreState) => state.lookups.allCompetitions
const competitionTypes = (state: Models.StoreState) => state.lookups.competitionTypes
const records = (state: Models.StoreState) => state.lookups.records

export const getCurrentRating = createSelector(rating, ratingTypes, (rating, types) => {
    return types.find(x => x.ratingType == rating)
})

export const getCurrentRatingOrganization = createSelector(getCurrentRating, (rating) => {
    return !!rating ? rating.organization : null
})

export const getRatings = createSelector(getCurrentRatingOrganization, ratings, (organization, ratings) => {
    return organization == "upf" ? ratings.sort(sortUPFRating) : ratings
})

export const getEntryDetails = createSelector(entryDetails, allCompetitions, competitionTypes, records, getCurrentRating, (entryDetails, competitions, competitionTypes, records, rating) => {
    return !!entryDetails ? { ...entryDetails, details: getDetails(entryDetails.details, competitionTypes, competitions, records, rating.type == "referee", true)} : entryDetails
})