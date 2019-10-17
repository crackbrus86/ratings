import * as ApiService from "../../../infrastructure/call.api";

const lookupPath = "../wp-content/plugins/ratings/server/LookupController/";
const apiTypes = ApiService.RequestTypes;

export const getRatings = () => {
    return ApiService.callApi({
        url: lookupPath + "GetActiveRatingTypes.php",
        type: apiTypes.GET
    });
}

export const getCompetitions = () => {
    return ApiService.callApi({
        url: lookupPath + "GetCompetitionsLookup.php",
        type: apiTypes.GET
    })
}

export const getCompetitionTypes = () => {
    return ApiService.callApi({
        url: lookupPath + "GetCompetitionTypesLookup.php",
        type: apiTypes.GET
    })
}

export const getRecords = () => {
    return ApiService.callApi({
        url: lookupPath + "GetRecordsLookup.php",
        type: apiTypes.GET
    })
}