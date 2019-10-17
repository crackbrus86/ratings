import * as CallApi from "../../../infrastructure/call.api"
import * as Models from "../models/index.models"

const ratingsApiPath = "../wp-content/plugins/ratings/server/RatingController/"
const apiTypes = CallApi.RequestTypes;

export const changeRatingType = (contract: { ratingType: string}) => {
    return CallApi.callApi({
        url: ratingsApiPath + 'ChangeRatingType.php',
        type: apiTypes.POST,
        data: contract
    })
}