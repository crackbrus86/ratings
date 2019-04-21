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
}