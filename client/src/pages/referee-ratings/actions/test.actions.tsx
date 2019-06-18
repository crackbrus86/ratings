import * as ActionTypes from "./types/action.types";
import * as Models from "../models/index.models";
import * as Reducers from "../reducers/index.reducer";
import * as Services from "../services/index.servces";

export namespace ActionCreators{
    export const getTestRefereeEntries = (year: number) => (d, gs: () => Models.StoreState) => {
        Services.TestServices.getTestEmployeeEntries(year).then((data) => {
            d({
                type: ActionTypes.LOAD_TEST_ENTRIES,
                payload: data
            });
        })
    }
}