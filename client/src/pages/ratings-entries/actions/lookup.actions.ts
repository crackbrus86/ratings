import * as Services from "../services/lookup.services";
import * as Models from "../models/index.models";
import * as ActionTypes from "./action.types";

export namespace ActionCreators{
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
}