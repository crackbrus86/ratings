import * as CallApi from "../../../infrastructure/call.api";
import * as Models from "../models/index.models";

const lookupApiPath = "../wp-content/plugins/ratings/server/EntryController/";
const apiTypes = CallApi.RequestTypes;

export const createEntry = (entry: Models.Entry) => {
    return CallApi.callApi({
        url: lookupApiPath + 'CreateEntry.php',
        type: apiTypes.POST,
        data: entry
    });
}