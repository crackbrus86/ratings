import * as Services from "../services/index.services";
import * as Models from "../models/index.models";
import * as ActionTypes from "./action.types";
import * as toastr from "toastr";
toastr.options.timeOut = 5000;

export namespace ActionCreators{
    export const initLookups = () => (d, gs: () => Models.StoreState) => {
        d(loadCompetitions());
        d(loadRecords());
        d(loadCompTypes());
        d(loadRegions());
        d(loadCoaches());
        d(loadFstList());
        d(loadSchools());
        d(loadRatingTypes())
    }

    export const loadCompetitions = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getCompetitions().then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_COMPETITIONS,
                    payload: <ActionTypes.LOAD_COMPETITIONS_PAYLOAD>{
                        competitions: response.data
                    }
                })
            }
        })
    }

    export const loadRecords = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getRecords().then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_RECORDS,
                    payload: <ActionTypes.LOAD_RECORDS_PAYLOAD>{
                        records: response.data
                    }
                })
            }
        })
    }

    export const loadNames = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getNames().then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_NAMES,
                    payload: <ActionTypes.LOAD_NAMES_PAYLOAD> response.data
                })
            }
        })
    }

    export const loadCompTypes = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getCompTypes().then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_COMP_TYPES,
                    payload: <ActionTypes.LOAD_COMP_TYPES_PAYLOAD> response.data
                })
            }
        })
    }

    export const loadRegions = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getRegions().then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_REGIONS,
                    payload: <ActionTypes.LOAD_REGIONS_PAYLOAD> response.data
                });
            }
        });
    }

    export const loadCoaches = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getCoaches().then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_COACHES,
                    payload: <ActionTypes.LOAD_COACHES_PAYLOAD> response.data
                })
            }
        });
    }

    export const loadFstList = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getFst().then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_FST,
                    payload: <ActionTypes.LOAD_FST_PAYLOAD> response.data
                })
            }
        });
    }

    export const loadSchools = () => (d, gs: () => Models.StoreState) => {
        Services.LookupServices.getSchools().then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_SCHOOLS,
                    payload: <ActionTypes.LOAD_SCHOOLS_PAYLOAD> response.data
                })
            }
        });
    }

    export const loadRatingTypes = () => (d) => {
        Services.LookupServices.getRatingTypes().then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_RATING_TYPES,
                    payload: <ActionTypes.LOAD_RATING_TYPES_PAYLOAD>response.data
                })
            }
        })
    }

    export const changeRatingType = (ratingType: string) => (d) => {
        Services.RatingsServices.changeRatingType({ratingType}).then(response => {
            if(response.status){
                toastr.success(response.message)
                d(loadRatingTypes())
            }
        })
    }
}