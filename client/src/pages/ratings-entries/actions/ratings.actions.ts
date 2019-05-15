import * as ActionTypes from "./action.types";
import * as Models from "../models/index.models";
import * as Services from "../services/ratings.services";
import * as toastr from "toastr";
toastr.options.timeOut = 5000;

export namespace ActionCreators{
    export const loadMinistryRatings = () => (d, gs: () => Models.StoreState) => {
        Services.getMinistryRatings({
            year: gs().shell.startDate.getFullYear()
        }).then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_MINISTRY_RATINGS,
                    payload: <ActionTypes.LOAD_MINISTRY_RATINGS_PAYLOAD> response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const loadUPFRatings = () => (d, gs: () => Models.StoreState) => {
        Services.getUPFRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_UPF_RATINGS,
                    payload: <ActionTypes.LOAD_UPF_RATINGS_PAYLOAD> response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const loadMinistryCoachRatings = () => (d, gs: () => Models.StoreState) => {
        Services.getMinistryCoachRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_MINISTRY_COACH_RATINGS,
                    payload: <ActionTypes.LOAD_MINISTRY_COACH_RATINGS_PAYLOAD> response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const loadUPFCoachRatings = () => (d, gs: () => Models.StoreState) => {
        Services.getUPFCoachRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_UPF_COACH_RATINGS,
                    payload: <ActionTypes.LOAD_UPF_COACH_RATINGS_PAYLOAD> response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const loadMinistryRegionRatings = () => (d, gs: () => Models.StoreState) => {
        Services.getMinistryRegionRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_MINISTRY_REGION_RATINGS,
                    payload: <ActionTypes.LOAD_MINISTRY_REGION_RATINGS_PAYLOAD> response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const loadMinistryFstRatings = () => (d, gs: () => Models.StoreState) => {
        Services.getMinistryFstRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_MINISTRY_FST_RATINGS,
                    payload: <ActionTypes.LOAD_MINISTRY_FST_RATINGS_PAYLOAD> response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const loadMinistrySchoolRatings = () => (d, gs: () => Models.StoreState) => {
        Services.getMinistrySchoolRatings({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_MINISTRY_SCHOOL_RATINGS,
                    payload: <ActionTypes.LOAD_MINISTRY_SCHOOL_RATINGS_PAYLOAD> response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }
}