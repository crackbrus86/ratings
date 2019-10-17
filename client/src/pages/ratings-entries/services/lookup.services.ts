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

export const getNames = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetAllNames.php',
        type: apiTypes.GET
    });
}

export const getCompTypes = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetCompetitionTypesLookup.php',
        type: apiTypes.GET
    });
}

export const getRegions = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetAllRegionsLookup.php',
        type: apiTypes.GET
    });
}

export const getCoaches = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetAllCoaches.php',
        type: apiTypes.GET
    });
}

export const getFst = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetAllFst.php',
        type: apiTypes.GET
    });
}

export const getSchools = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetAllSchools.php',
        type: apiTypes.GET
    });
}

export const getRatingTypes = () => {
    return CallApi.callApi({
        url: lookupApiPath + 'GetRatingTypes.php',
        type: apiTypes.GET
    })
}