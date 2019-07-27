import * as ActionTypes from "./types/action.types"
import * as Actions from "./index.actions"
import * as Models from "../models/index.models"

export namespace ActionCreators{
    export const modifyStartDate = (startDate: Date) => (d) => {
        d({
            type: ActionTypes.CHANGE_START_DATE,
            payload: startDate as ActionTypes.CHANGE_START_DATE_PAYLOAD
        })
        d(Actions.RefereeEntryActions.ActionCreators.loadRefereeEntries())
    }
}