import * as ActionTypes from "./action.types";

export namespace ActionCreators{
    export const changeStartDate = (date: Date) => (d) => {
        d({
            type: ActionTypes.CHANGE_START_TIME,
            payload: <ActionTypes.CHANGE_START_TIME_PAYLOAD> date
        })
    }
}