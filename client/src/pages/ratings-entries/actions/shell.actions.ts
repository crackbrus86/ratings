import * as ActionTypes from "./action.types";
import * as Models from "../models/index.models";
import * as Actions from "./index.actions";

export namespace ActionCreators{
    export const changeStartDate = (date: Date) => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.CHANGE_START_TIME,
            payload: <ActionTypes.CHANGE_START_TIME_PAYLOAD> date
        })
        d(Actions.EntriesActions.ActionCreators.getEntries());
        d(Actions.RatingsActions.ActionCreators.loadMinistryRatings());
    }

    export const changeSearchValue = (value: string) => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.CHANGE_SEARCH_VALUE,
            payload: <ActionTypes.CHANGE_SEARCH_VALUE_PAYLOAD> value
        })
    }
}