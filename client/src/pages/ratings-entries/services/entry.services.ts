import * as CallApi from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const entryApiPath = "../wp-content/plugins/ratings/server/EntryController/";
const apiTypes = CallApi.RequestTypes;

export const createEntry = (entry: Models.Entry) => {
    return CallApi.callApi({
        url: entryApiPath + 'CreateEntry.php',
        type: apiTypes.POST,
        data: entry
    });
}

export const getEntries = (contract: Models.EntryModels.GetEntries_Contract) => {
    return CallApi.callApi({
        url: entryApiPath + 'GetEntries.php',
        type: apiTypes.GET,
        data: contract
    });
}