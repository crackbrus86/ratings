import * as CallApi from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const lookupApiPath = "../wp-content/plugins/ratings/server/LookupController/";
const apiTypes = CallApi.RequestTypes;

export const getCompetitions = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetCompetitionsLookup.php', 
        type: apiTypes.GET 
    });
}

export const getPoints = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetAllPointsLookup.php',
        type: apiTypes.GET
    });
}

export const savePoint = (point: Models.LookupModels.Point) => {
    return CallApi.callApi({
        url: lookupApiPath + 'SavePoint.php',
        type: apiTypes.POST,
        data: point
    })
}

export const getRecords = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetRecordsLookup.php',
        type: apiTypes.GET
    });
}

export const getCompTypes = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetCompetitionTypesLookup.php',
        type: apiTypes.GET
    });
}