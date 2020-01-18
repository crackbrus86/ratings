import * as types from "./action.types";
import * as Services from "../services/index.services";
import * as Models from "../models/index.models";

export namespace ActionCreators{
    export const loadRatingEntries = () => (d, gs: () => Models.StoreState) => {
        let rating = gs().shell.rating;
        d(emptyRatingEntries());
        switch(rating){
            case Models.RatingModels.RatingTypes.MinAthMale: {
                d(loadMinistryRatingByGender("M"));
                return;
            }
            case Models.RatingModels.RatingTypes.MinAthFemale: {
                d(loadMinistryRatingByGender("F"));
                return;
            }
            case Models.RatingModels.RatingTypes.UpfAthMale: {
                d(loadUPFRatingsByGender("M"))
                return
            }
            case Models.RatingModels.RatingTypes.UpfAthFemale: {
                d(loadUPFRatingsByGender("F"))
                return
            }
            case Models.RatingModels.RatingTypes.MinCoach: {
                d(loadCoachMinistryRatings())
                return
            }
            case Models.RatingModels.RatingTypes.UpfCoach: {
                d(loadCoachUPFRatings())
                return
            }
            case Models.RatingModels.RatingTypes.MinRegion: {
                d(loadRegionsRatings())
                return
            }
            case Models.RatingModels.RatingTypes.MinFST: {
                d(loadFstRatings())
                return
            }
            case Models.RatingModels.RatingTypes.MinSchool: {
                d(loadSchoolRatings())
                return
            }
            case Models.RatingModels.RatingTypes.MinReferee: {
                d(loadRefereeRatings())
                return
            }
            default:
                d(emptyRatingEntries());
                return;
        }
    }

    export const loadMinistryRatingByGender = (gender: string) => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getMinistryRatingsByGender({
            year: gs().shell.startDate.getFullYear(),
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

    export const loadUPFRatingsByGender = (gender: string) => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getUPFRatingsByGender({
            year: gs().shell.startDate.getFullYear(),
            gender
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadCoachMinistryRatings = () => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getCoachMinistryRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadCoachUPFRatings = () => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getCoachUPFRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadRegionsRatings = () => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getRegionsRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadFstRatings = () => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getFstRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadSchoolRatings = () => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getSchoolRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadRefereeRatings = () => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getRefereeRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const emptyRatingEntries = () => (d) => {
        d({
            type: types.EMPTY_RATING_ENTRIES
        });
    }

    export const openEntryDetails = (entry: Models.RatingEntry) => (d) => {
        d({
            type: types.OPEN_ENTRY_DETAILS,
            payload: entry as types.OPEN_ENTRY_DETAILS_PAYLOAD
        })
    }

    export const closeEntryDetails = () => (d) => {
        d({type: types.CLOSE_ENTRY_DETAILS})
    }
}