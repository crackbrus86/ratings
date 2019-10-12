import { createSelector } from "reselect";
import * as Models from "../models/index.models";

const rating = (state: Models.StoreState) => state.shell.rating;
const ratings = (state: Models.StoreState) => state.lookups.ratings;

export const ratingTitle = createSelector(rating, ratings, (rating, ratings) => {
    return !!rating ? ratings.find(x => x.ratingType == rating).title : null;
});

export const showWilks = createSelector(rating, ratings, (rating, ratings) => {
    return !!ratings.filter(r => r.type == "athlete").find(x => x.ratingType == rating)
})