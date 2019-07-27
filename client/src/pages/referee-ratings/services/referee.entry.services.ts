import * as CallApi from "../../../infrastructure/call.api"
import * as Models from "../models/index.models"

const path = "../wp-content/plugins/ratings/server/RefereeEntryController/"
const apiTypes = CallApi.RequestTypes;

export const create = (refereeEntry: Models.RefereeEntry) => {
    return CallApi.callApi({
        url: path + "Create.php",
        type: apiTypes.POST,
        data: refereeEntry
    })
}

export const update = (refereeEntry: Models.RefereeEntry) => {
    return CallApi.callApi({
        url: path + "Update.php",
        type: apiTypes.POST,
        data: refereeEntry
    })
}

export const getAll = (contract: Models.RefereeEntryModels.GetAll_Contract) => {
    return CallApi.callApi({
        url: path + "GetAll.php",
        type: apiTypes.GET,
        data: contract
    })
}

export const remove = (contract: Models.RefereeEntryModels.Delete_Contract) => {
    return CallApi.callApi({
        url: path + "Delete.php",
        type: apiTypes.POST,
        data: contract
    })
}