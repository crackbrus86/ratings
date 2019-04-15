import { createSelector } from "reselect";
import * as Models from "../models/index.models";

const ratings = (state: Models.StoreState) => state.ratings.ministryRatings;
const competitions = (state: Models.StoreState) => state.lookup.competitions;

export const modifiedRatings = createSelector(ratings, competitions, (ratings, competitions) => {
    return ratings.map(r => {
        let details = r.details;
        for(var i = 0; i < competitions.length; i++){
            details = details.replace(new RegExp(competitions[i].dbName, 'g'), competitions[i].name);
        }
        return {...r, details}
    });
});

export const ministryRatingsMale = createSelector(modifiedRatings, (ratings) => {
    return ratings.filter(r => r.gender == "M");
});

export const ministryRatingsFemale = createSelector(modifiedRatings, (ratings) => {
    return ratings.filter(r => r.gender == "F");
})