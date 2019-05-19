import {createSelector} from "reselect";
import * as Models from "../models/index.models";

const ratings = (state: Models.StoreState) => state.lookups.ratings;

export const ratingsList = createSelector(ratings, (ratings) => {
    let list: Models.SelectOption[] = [{text: '', value: null}];
    list = list.concat(ratings.map(rating => ({text: rating.title, value: rating.ratingType} as Models.SelectOption)));
    return list;
});