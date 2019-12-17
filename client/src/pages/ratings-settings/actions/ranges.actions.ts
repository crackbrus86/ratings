import * as Services from "../services/range.services";
import * as Models from "../models/index.models";
import * as ActionTypes from "./action.types";
import { callApi } from "../../../infrastructure/call.api";
import * as toastr from "toastr";

export namespace ActionCreators{
   export const loadRanges = () => (d, gs: () => Models.StoreState) => {
        Services.getRanges().then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_RANGES,
                    payload: <ActionTypes.LOAD_RANGES_PAYLOAD> response.data
                })
            }
        })
   }

   export const saveRange = (range: Models.Range) => (d, gs: () => Models.StoreState) => {
        Services.saveRange({
            id: range.id,
            competition: range.comp,
            place: range.place,
            compType: range.compType,
            range: range.rangeValue
        }).then(response => {
            if(response.status){
                toastr.success(response.message);
                d(loadRanges());
            }else{
                toastr.error(response.message);
            }
        })
   }
}