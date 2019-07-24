import * as CallApi from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const refereeSettingsApiPath = "../wp-content/plugins/ratings/server/RefereeSettingController/";
const apiTypes = CallApi.RequestTypes;

export const getRefereeSettings = () => {
    return CallApi.callApi({
        url: refereeSettingsApiPath + 'GetRefereeSettings.php',
        type: apiTypes.GET
    });
}

export const updateRefereeSetting = (setting: Models.RefereeSetting) => {
    return CallApi.callApi({
        url: refereeSettingsApiPath + 'UpdateRefereeSetting.php',
        type: apiTypes.POST,
        data: setting
    })
}