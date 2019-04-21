import { createSelector } from "reselect";
import * as Models from "../models/index.models";

const ratings = (state: Models.StoreState) => state.ratings.ministryRatings;
const competitions = (state: Models.StoreState) => state.lookup.competitions;
const records = (state: Models.StoreState) => state.lookup.records;
const compTypes = (state: Models.StoreState) => state.lookup.compTypes;
const upfRatings = (state: Models.StoreState) => state.ratings.upfRatings;

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

function getDetails(originalDetails: string, types: Models.CompetitionType[], competitions: Models.Competition[], records: Models.Record[]){

    let details = originalDetails;

    let detailsAsArray = [];

    for(var i = 0; i < competitions.length; i++){
        details = details.replace(new RegExp(` ${competitions[i].dbName}`, 'g'), competitions[i].name);
    }

    for(var i = 0; i < records.length; i++){
        details = details.replace(new RegExp(` ${records[i].dbName}`, 'g'), records[i].name);
    }

    for(var i = 0; i < types.length; i++){
        details = details.replace(new RegExp(` ${types[i].name}`, 'g'), ` - ${types[i].displayName}`);
    }

    detailsAsArray = details.split(",");

    detailsAsArray = detailsAsArray.map(d => ({text: d, range: d.split(' - ')[2].split(' ')[0]}));

    detailsAsArray = detailsAsArray.sort((a,b) => a.range - b.range);

    detailsAsArray = detailsAsArray.map(d => `<li>${d.text}</li>`);

    return `<ul>${detailsAsArray.join('')}</ul>`;
}

function sortUPFRating(ratingA: Models.Rating, ratingB: Models.Rating){
    let detailsA = ratingA.detailsData.map(x => parseInt(x.trim()));
    let detailsB = ratingB.detailsData.map(x => parseInt(x.trim()));
    let globalLength = detailsA.length >= detailsB.length ? detailsA.length : detailsB.length;
    detailsA = detailsA.sort((a,b) => a - b);
    detailsB = detailsB.sort((a,b) => a - b);
    var i = 0;
    while(i < globalLength){
        let valueA = detailsA[i] || 1000;
        let valueB = detailsB[i] || 1000;
        if(valueA == valueB) {
            ++i;
            continue;
        }
        if(valueA > valueB) return 1;
        if(valueA < valueB) return -1;
    }
    return 1;
}