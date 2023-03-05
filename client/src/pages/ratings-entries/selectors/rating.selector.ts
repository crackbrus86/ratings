import { createSelector } from "reselect";
import * as Models from "../models/index.models";
import {getDetails, sortUPFRating} from "../../../utils/utils";

const ratings = (state: Models.StoreState) => state.ratings.ministryRatings;
const allCompetitions = (state: Models.StoreState) => state.lookup.allCompetitions;
const records = (state: Models.StoreState) => state.lookup.records;
const compTypes = (state: Models.StoreState) => state.lookup.compTypes;
const upfRatings = (state: Models.StoreState) => state.ratings.upfRatings;
const ministryCoachRatings = (state: Models.StoreState) => state.ratings.ministryCoachRatings;
const upfCoachRatings = (state: Models.StoreState) => state.ratings.upfCoachRatings;
const ministryRegionRatings = (state: Models.StoreState) => state.ratings.ministryRegionRatings;
const ministryFstRatings = (state: Models.StoreState) => state.ratings.ministryFstRatings;
const ministrySchoolRatings = (state: Models.StoreState) => state.ratings.ministrySchoolRatings;

export const modifiedRatings = createSelector(ratings, allCompetitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({ ...r, details: getDetails(r.details, types, competitions, records) }));
});

export const ministryRatingsMale = createSelector(modifiedRatings, (ratings) => {
    return ratings.filter(r => r.gender == "M");
});

export const ministryRatingsFemale = createSelector(modifiedRatings, (ratings) => {
    return ratings.filter(r => r.gender == "F");
});

export const modifiedRatingsUPF = createSelector(upfRatings, allCompetitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({ ...r, details: getDetails(r.details, types, competitions, records) }));
});

export const upfRatingsMale = createSelector(modifiedRatingsUPF, (ratings) => {
    return ratings.filter(r => r.gender == "M").sort(sortUPFRating);
});

export const upfRatingsFemale = createSelector(modifiedRatingsUPF, (ratings) => {
    return ratings.filter(r => r.gender == "F").sort(sortUPFRating);
});

export const modifiedMinistryCoachRatings = createSelector(ministryCoachRatings, allCompetitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});

export const modifiedUPFCoachRatings = createSelector(upfCoachRatings, allCompetitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)})).sort(sortUPFRating);
});

export const modifiedMinistryRegionRatings = createSelector(ministryRegionRatings, allCompetitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});

export const modifiedMinistryFstRatings = createSelector(ministryFstRatings, allCompetitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});

export const modifiedMinistrySchoolRatings = createSelector(ministrySchoolRatings, allCompetitions, compTypes, records, (ratings, competitions, types, records) => {
    return ratings.map(r => ({...r, details: getDetails(r.details, types, competitions, records)}));
});