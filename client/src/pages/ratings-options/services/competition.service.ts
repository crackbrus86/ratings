import * as CallApi from "../../../infrastructure/call.api";
import * as Models from "../models/competition.models";

const competitionApiPath = "../wp-content/plugins/ratings/server/CompetitionController/";
const apiTypes = CallApi.RequestTypes;

export const getActiveCompetitions = () => {
    return CallApi.callApi({
        url: `${competitionApiPath}GetActiveCompetitions.php`,
        type: apiTypes.GET
    });
};

export const getAllCompetitions = () => {
    return CallApi.callApi({
        url: `${competitionApiPath}GetAllCompetitions.php`,
        type: apiTypes.GET
    });
};

export const createCompetition = (competition: Models.CreateCompetitionRequest) => {
    return CallApi.callApi({
        url: `${competitionApiPath}CreateCompetition.php`,
        type: apiTypes.POST,
        data: competition
    });
};

export const updateCompetition = (competition: Models.UpdateCompetitionRequest) => {
    return CallApi.callApi({
        url: `${competitionApiPath}UpdateCompetition.php`,
        type: apiTypes.POST,
        data: competition
    });
};

export const deleteCompetition = (contract: Models.DeleteCompetitionRequest) => {
    return CallApi.callApi({
        url: `${competitionApiPath}DeactivateCompetition.php`,
        type: apiTypes.POST,
        data: contract
    });
};

export const restoreeCompetition = (contract: Models.RestoreCompetitionRequest) => {
    return CallApi.callApi({
        url: `${competitionApiPath}ReActivateCompetition.php`,
        type: apiTypes.POST,
        data: contract
    });
};