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
}