import * as CallApi from "../../../infrastructure/call.api"
import * as Models from "../models/index.models"

const path = "../wp-content/plugins/ratings/server/LookupController/"
const apiTypes = CallApi.RequestTypes

export const getActivities = () => {
    return CallApi.callApi({
        url: path + "GetActivities.php",
        type: apiTypes.GET
    })
}

export const getCompetitions = () => {
    return CallApi.callApi({
        url: path + 'GetCompetitionsLookup.php', 
        type: apiTypes.GET 
    });
}