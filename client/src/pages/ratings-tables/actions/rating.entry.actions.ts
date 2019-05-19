import * as types from "./action.types";
import * as Services from "../services/index.services";
import * as Models from "../models/index.models";

export namespace ActionCreators{
    export const loadRatingEntries = () => (d, gs: () => Models.StoreState) => {
        let rating = gs().shell.rating;
        switch(rating){
            case Models.RatingModels.RatingTypes.MinAthMale: {
                d(loadMinistryRatingByGender("M"));
                return;
            }
            case Models.RatingModels.RatingTypes.MinAthFemale: {
                d(loadMinistryRatingByGender("F"));
                return;
            }
            default:
                d(emptyRatingEntries());
                return;
        }
    }

    export const loadMinistryRatingByGender = (gender: string) => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getMinistryRatingsByGender({
            year: new Date().getFullYear(),
            gender: gender
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const emptyRatingEntries = () => (d, gs: () => Models.StoreState) => {
        d({
            type: types.EMPTY_RATING_ENTRIES
        });
    }
}