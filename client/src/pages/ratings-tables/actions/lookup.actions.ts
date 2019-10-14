import * as types from "./action.types";
import * as Services from "../services/index.services";
import * as Models from "../models/index.models";

export namespace ActionCreators{
    export const loadRatings = () => (d, gs: () => Models.StoreState) => {
        Services.LookupService.getRatings().then(response => {
            if(response.status){
                d({
                    type: types.LOAD_RATINGS,
                    payload: <types.LOAD_RATINGS_PAYLOAD>response.data
                });
            }
        })
    }

    export const loadCompetitions = () => (d) => {
        Services.LookupService.getCompetitions().then(response => {
            if(response.status) d({type: types.LOAD_COMPETITIONS, payload: response.data as types.LOAD_COMPETITIONS_PAYLOAD})
        })
    }

    export const loadCompetitionTypes = () => (d) => {
        Services.LookupService.getCompetitionTypes().then(response => {
            if(response.status) d({type: types.LOAD_COMPETITION_TYPES, payload: response.data as types.LOAD_COMPETITION_TYPES_PAYLOAD})
        })
    }

    export const loadRecords = () => (d) => {
        Services.LookupService.getRecords().then(response => {
            if(response.status) d({type: types.LOAD_RECORDS, payload: response.data as types.LOAD_RECORDS_PAYLOAD})
        })
    }

    export const loadLookups = () => (d) => {
        d(loadRatings())
        d(loadCompetitions())
        d(loadCompetitionTypes())
        d(loadRecords())
    }
}