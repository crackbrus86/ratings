import * as ApiService from "../../../infrastructure/call.api";

const lookupPath = "../wp-content/plugins/ratings/server/LookupController/";
const apiTypes = ApiService.RequestTypes;

export const getRatings = () => {
    return ApiService.callApi({
        url: lookupPath + "GetRatingTypes.php",
        type: apiTypes.GET
    });
}