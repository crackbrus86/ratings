import { createSelector } from "reselect";
import * as Models from "../models/index.models";
import {getDetails, sortUPFRating} from "../../../utils/utils";

const ratings = (state: Models.StoreState) => state.ratings.ministryRatings;
const competitions = (state: Models.StoreState) => state.lookup.competitions;
const records = (state: Models.StoreState) => state.lookup.records;
const compTypes = (state: Models.StoreState) => state.lookup.compTypes;
const upfRatings = (state: Models.StoreState) => state.ratings.upfRatings;
const ministryCoachRatings = (state: Models.StoreState) => state.ratings.ministryCoachRatings;
const upfCoachRatings = (state: Models.StoreState) => state.ratings.upfCoachRatings;
const ministryRegionRatings = (state: Models.StoreState) => state.ratings.ministryRegionRatings;
const ministryFstRatings = (state: Models.StoreState) => state.ratings.ministryFstRatings;
const ministrySchoolRatings = (state: Models.StoreState) => state.ratings.ministrySchoolRatings;

export const modifiedRatings = createSelector(ratings, competitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({ ...r, details: getDetails(r.details, types, competitions, records) }));
});

export const ministryRatingsMale = createSelector(modifiedRatings, (ratings) => {
    return ratings.filter(r => r.gender == "M");
});

export const ministryRatingsFemale = createSelector(modifiedRatings, (ratings) => {
    return ratings.filter(r => r.gender == "F");
});

export const modifiedRatingsUPF = createSelector(upfRatings, competitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({ ...r, details: getDetails(r.details, types, competitions, records) }));
});

export const upfRatingsMale = createSelector(modifiedRatingsUPF, (ratings) => {
    return ratings.filter(r => r.gender == "M").sort(sortUPFRating);
});

export const upfRatingsFemale = createSelector(modifiedRatingsUPF, (ratings) => {
    return ratings.filter(r => r.gender == "F").sort(sortUPFRating);
});

export const modifiedMinistryCoachRatings = createSelector(ministryCoachRatings, competitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});

export const modifiedUPFCoachRatings = createSelector(upfCoachRatings, competitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)})).sort(sortUPFRating);
});

export const modifiedMinistryRegionRatings = createSelector(ministryRegionRatings, competitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});

export const modifiedMinistryFstRatings = createSelector(ministryFstRatings, competitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});

export const modifiedMinistrySchoolRatings = createSelector(ministrySchoolRatings, competitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});