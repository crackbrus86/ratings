import * as CallApi from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const ratingsApiPath = "../wp-content/plugins/ratings/server/RatingController/";
const apiTypes = CallApi.RequestTypes;

export const getMinistryRatings = (contract: Models.RatingModels.GetRatings_Contract) => {
    return CallApi.callApi({
        url: ratingsApiPath + 'GetMinistryRatings.php',
        type: apiTypes.GET,
        data: contract
    });
}

export const getUPFRatings = (contract: Models.RatingModels.GetRatings_Contract) => {
    return CallApi.callApi({
        url: ratingsApiPath + 'GetUPFRatings.php',
        type: apiTypes.GET,
        data: contract
    });
}