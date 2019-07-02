import * as ActionTypes from "./types/action.types";
import * as Models from "../models/index.models";
import * as Reducers from "../reducers/index.reducer";
import * as Services from "../services/index.servces";
import * as toastr from "toastr"

export namespace ActionCreators{
    export const loadRefereeSettings = () => (d, gs: () => Models.StoreState) => {
        Services.RefereeSettingService.getRefereeSettings().then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_REFEREE_SETTINGS,
                    payload: response.data
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const selectRefereeSetting = (setting: Models.RefereeSetting) => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.SELECT_REFEREE_SETTING,
            payload: setting
        })
    }
}