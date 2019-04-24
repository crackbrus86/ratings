import * as Services from "../services/lookup.services";
import * as Models from "../models/index.models";
import * as ActionTypes from "./action.types";

export namespace ActionCreators{
    export const initLookups = () => (d, gs: () => Models.StoreState) => {
        d(loadCompetitions());
        d(loadRecords());
        d(loadCompTypes());
        d(loadRegions());
    }

    export const loadCompetitions = () => (d, gs: () => Models.StoreState) => {
        Services.getCompetitions().then((response) => {
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
        Services.getRecords().then((response) => {
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
        Services.getNames().then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_NAMES,
                    payload: <ActionTypes.LOAD_NAMES_PAYLOAD> response.data
                })
            }
        })
    }

    export const loadCompTypes = () => (d, gs: () => Models.StoreState) => {
        Services.getCompTypes().then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_COMP_TYPES,
                    payload: <ActionTypes.LOAD_COMP_TYPES_PAYLOAD> response.data
                })
            }
        })
    }

    export const loadRegions = () => (d, gs: () => Models.StoreState) => {
        Services.getRegions().then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_REGIONS,
                    payload: <ActionTypes.LOAD_REGIONS_PAYLOAD> response.data
                });
            }
        });
    }
}