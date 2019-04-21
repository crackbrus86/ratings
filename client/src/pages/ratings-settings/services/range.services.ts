import * as CallApi from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const rangesApiPath = "../wp-content/plugins/ratings/server/RangesController/";
const apiTypes = CallApi.RequestTypes;

export const getRanges = () => {
    return CallApi.callApi({
        url: rangesApiPath + 'GetAllRanges.php',
        type: apiTypes.GET
    });
}

export const saveRange = (point: Models.UPFRange) => {
    return CallApi.callApi({
        url: rangesApiPath + 'SaveRange.php',
        type: apiTypes.POST,
        data: point
    })
}