import * as ActionTypes from "./types/action.types"
import * as Services from "../services/index.servces"
import * as Models from "../models/index.models"

export const getRating = () => (d, gs: () => Models.StoreState) => {
    Services.RefereeRating.getRating(gs().shell.startDate.getFullYear()).then(response => {
        if(response.status){
            d({type: ActionTypes.LOAD_RATING, payload: response.data as ActionTypes.LOAD_RATING_PAYLOAD})
        }else{ toastr.error(response.message)}
    })
}