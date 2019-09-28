import * as CallApi from "../../../infrastructure/call.api"
import * as Models from "../models/index.models"

const path = "../wp-content/plugins/ratings/server/RefereeRatingController/"
const apiTypes = CallApi.RequestTypes;

export const getRating = (year: number) => {
    return CallApi.callApi({
        url: path + "GetAllRatings.php",
        type: apiTypes.GET,
        data: { year: year }
    })
}