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

    export const loadUPFRatingsByGender = (gender: string) => (d, gs: () => Models.StoreState) => {
        Services.RatingEntryService.getUPFRatingsByGender({
            year: new Date().getFullYear(),
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

    export const loadCoachMinistryRatings = () => (d) => {
        Services.RatingEntryService.getCoachMinistryRatings({
            year: new Date().getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadCoachUPFRatings = () => (d) => {
        Services.RatingEntryService.getCoachUPFRatings({
            year: new Date().getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadRegionsRatings = () => (d) => {
        Services.RatingEntryService.getRegionsRatings({
            year: new Date().getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadFstRatings = () => (d) => {
        Services.RatingEntryService.getFstRatings({
            year: new Date().getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadSchoolRatings = () => (d) => {
        Services.RatingEntryService.getSchoolRatings({
            year: new Date().getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATING_ENTRIES,
                    payload: <types.LOAD_RATING_ENTRIES_PAYLOAD>response.data
                })
            }
        })
    }

    export const loadRefereeRatings = () => (d) => {
        Services.RatingEntryService.getRefereeRatings({
            year: new Date().getFullYear()
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