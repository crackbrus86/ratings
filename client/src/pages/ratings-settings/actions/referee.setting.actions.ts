import * as ActionTypes from "./action.types";
import * as Models from "../models/index.models";
import * as Reducers from "../reducers/index.reducer";
import * as Services from "../services/index.services";
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

    export const updateRefereeSetting = (setting: Models.RefereeSetting) => (d, gs: () => Models.StoreState) => {
        Services.RefereeSettingService.updateRefereeSetting({
            id: setting.id,
            activity: setting.activity,
            coefficient: setting.coefficient
        }).then(response => {
            if(response.status){
                toastr.success(response.message);
                d(loadRefereeSettings());
            }else{
                toastr.error(response.message);
            }
        })
    }
}