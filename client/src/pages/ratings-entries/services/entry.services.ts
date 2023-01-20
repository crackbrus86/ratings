import * as CallApi from '../../../infrastructure/call.api';
import * as Models from '../models/index.models';

const entryApiPath = '../wp-content/plugins/ratings/server/EntryController/';
const apiTypes = CallApi.RequestTypes;

export const createEntry = (entry: Models.Entry) => {
    const saveEntryContract: Models.SaveEntry = { ...entry, regions: entry.regions.join(';') };
    return CallApi.callApi({
        url: entryApiPath + 'CreateEntry.php',
        type: apiTypes.POST,
        data: saveEntryContract
    });
}

export const updateEntry = (entry: Models.Entry) => {
    const saveEntryContract: Models.SaveEntry = { ...entry, regions: entry.regions.join(';') };
    return CallApi.callApi({
        url: entryApiPath + 'UpdateEntry.php',
        type: apiTypes.POST,
        data: saveEntryContract
    });
}

export const getEntries = (contract: Models.EntryModels.GetEntries_Contract) => {
    return CallApi.callApi({
        url: entryApiPath + 'GetEntries.php',
        type: apiTypes.GET,
        data: contract
    });
}

export const deleteEntry = (contract: Models.EntryModels.DeleteEntry_Contract) => {
    return CallApi.callApi({
        url: entryApiPath + "DeleteEntry.php",
        type: apiTypes.POST,
        data: contract
    });
}