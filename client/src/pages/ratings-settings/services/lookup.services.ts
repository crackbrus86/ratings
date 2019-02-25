import * as CallApi from "../../../infrastructure/call.api";

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