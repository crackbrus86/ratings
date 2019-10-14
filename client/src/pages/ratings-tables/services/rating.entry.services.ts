import * as ApiService from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const ratingEntryPath = "../wp-content/plugins/ratings/server/RatingController/";
const refereeRatingApiPath = "../wp-content/plugins/ratings/server/RefereeRatingController/";
const apiTypes = ApiService.RequestTypes;

export const getMinistryRatingsByGender = (contract: Models.RatingModels.GetRatingsByGender_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetMinistryRatingsByGender.php",
        type: apiTypes.GET,
        data: contract
    });
}

export const getUPFRatingsByGender = (contract: Models.RatingModels.GetRatingsByGender_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetUPFRatingsByGender.php",
        type: apiTypes.GET,
        data: contract
    });
}

export const getCoachMinistryRatings = (contract: Models.RatingModels.GetRatingsByYear_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetCoachMinistryRatings.php",
        type: apiTypes.GET,
        data: contract
    })
}

export const getCoachUPFRatings = (contract: Models.RatingModels.GetRatingsByYear_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetCoachUPFRatings.php",
        type: apiTypes.GET,
        data: contract
    })
}

export const getRegionsRatings = (contract: Models.RatingModels.GetRatingsByYear_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetRegionMinistryRatings.php",
        type: apiTypes.GET,
        data: contract
    })
}

export const getFstRatings = (contract: Models.RatingModels.GetRatingsByYear_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetFstMinistryRatings.php",
        type: apiTypes.GET,
        data: contract
    })
}

export const getSchoolRatings = (contract: Models.RatingModels.GetRatingsByYear_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetSchoolMinistryRatings.php",
        type: apiTypes.GET,
        data: contract
    })
}

export const getRefereeRatings = (contract: Models.RatingModels.GetRatingsByYear_Contract) => {
    return ApiService.callApi({
        url: refereeRatingApiPath + "GetAllRatings.php",
        type: apiTypes.GET,
        data: contract
    })
}