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

export const getMinistryCoachRatings = (contract: Models.RatingModels.GetRatings_Contract) => {
    return CallApi.callApi({
        url: ratingsApiPath + 'GetCoachMinistryRatings.php',
        type: apiTypes.GET,
        data: contract
    });
}

export const getUPFCoachRatings = (contract: Models.RatingModels.GetRatings_Contract) => {
    return CallApi.callApi({
        url: ratingsApiPath + 'GetCoachUPFRatings.php',
        type: apiTypes.GET,
        data: contract
    })
}

export const getMinistryRegionRatings = (contract: Models.RatingModels.GetRatings_Contract) => {
    return CallApi.callApi({
        url: ratingsApiPath + 'GetRegionMinistryRatings.php',
        type: apiTypes.GET,
        data: contract
    })
}

export const getMinistryFstRatings = (contract: Models.RatingModels.GetRatings_Contract) => {
    return CallApi.callApi({
        url: ratingsApiPath + 'GetFstMinistryRatings.php',
        type: apiTypes.GET,
        data: contract
    })
}