import * as ActionTypes from "./action.types";
import * as Models from "../models/index.models";

export namespace ActionCreators{
    export const addEntry = () => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.OPEN_ENTRY,
            payload: <ActionTypes.OPEN_ENTRY_PAYLOAD>{
                ratingEntryId: null,
                fullname: '',
                type: Models.EntryType.Place,
                event: null,
                place: null,
                eventDate: new Date()
            }
        })
    }

    export const updateEntry = (field: keyof Models.Entry, value: any) => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.UPDATE_ENTRY,
            payload: <ActionTypes.UPDATE_ENTRY_PAYLOAD>{
                field,
                value
            }
        })
    }

    export const closeEntry = () => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.CLOSE_ENTRY
        })
    }
}