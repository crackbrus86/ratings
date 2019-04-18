import { createSelector } from "reselect";
import * as Models from "../models/index.models";

const ratings = (state: Models.StoreState) => state.ratings.ministryRatings;
const competitions = (state: Models.StoreState) => state.lookup.competitions;
const compTypes = (state: Models.StoreState) => state.lookup.compTypes;

export const modifiedRatings = createSelector(ratings, competitions, compTypes, (ratings, competitions, types) => {
    return ratings.map(r => {
        let details = r.details;
        for(var i = 0; i < competitions.length; i++){
            details = details.replace(new RegExp(` ${competitions[i].dbName}`, 'g'), competitions[i].name);
        }
        for(var i = 0; i < types.length; i++){
            details = details.replace(new RegExp(` ${types[i].name}`, 'g'), ` - ${types[i].displayName}`);
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