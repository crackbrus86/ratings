import * as ApiService from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const ratingEntryPath = "../wp-content/plugins/ratings/server/RatingController/";
const apiTypes = ApiService.RequestTypes;

export const getMinistryRatingsByGender = (contract: Models.RatingModels.GetRatingsByGender_Contract) => {
    return ApiService.callApi({
        url: ratingEntryPath + "GetMinistryRatingsByGender.php",
        type: apiTypes.GET,
        data: contract
    });
}