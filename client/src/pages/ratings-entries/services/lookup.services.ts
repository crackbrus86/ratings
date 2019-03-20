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

export const getRecords = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetRecordsLookup.php',
        type: apiTypes.GET
    });
}