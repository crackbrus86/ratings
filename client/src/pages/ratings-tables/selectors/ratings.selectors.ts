import {createSelector} from "reselect"
import * as Models from "../models/index.models"
import {sortUPFRating} from "../../../utils/utils"

const ratings = (state: Models.StoreState) => state.entries.entries
const rating = (state: Models.StoreState) => state.shell.rating
const ratingTypes = (state: Models.StoreState) => state.lookups.ratings

export const getCurrentRatingOrganization = createSelector(rating, ratingTypes, (rating, types) => {
    let current = types.find(x => x.ratingType == rating)
    return !!current ? current.organization : null
})

export const getRatings = createSelector(getCurrentRatingOrganization, ratings, (organization, ratings) => {
    return organization == "upf" ? ratings.sort(sortUPFRating) : ratings
})