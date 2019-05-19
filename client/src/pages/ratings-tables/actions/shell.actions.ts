import * as types from "./action.types";
import * as Models from "../models/index.models";
import * as Actions from "./index.actions";

export namespace ActionCreators{
    export const changeRating = (ratingType: string) => (d, gs: () => Models.StoreState) => {
        d({
            type: types.CHANGE_RATING,
            payload: <types.CHANGE_RATING_PAYLOAD> ratingType
        });
        d(Actions.RatingEntryActions.ActionCreators.loadRatingEntries())
    }
}