import * as ActionTypes from "./action.types";
import * as Models from "../models/index.models";
import * as Services from "../services/entry.services";
import * as toastr from "toastr";
toastr.options.timeOut = 5000;

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
        if(field == "type") { 
            d(resetEvent());
            d(resetPlace());
        }
    }

    export const resetPlace = () => (d, gs: () => Models.StoreState) => {
        let place = gs().entries.currentEntry.type == Models.EntryType.Record ? 1 : null;
        d({
            type: ActionTypes.UPDATE_ENTRY,
            payload: <ActionTypes.UPDATE_ENTRY_PAYLOAD>{
                field: "place",
                value: place
            }
        })
    }

    export const resetEvent = () => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.UPDATE_ENTRY,
            payload: <ActionTypes.UPDATE_ENTRY_PAYLOAD>{
                field: "event",
                value: null
            }
        })
    }

    export const closeEntry = () => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.CLOSE_ENTRY
        })
    }

    export const saveEntry = () => (d, gs: () => Models.StoreState) => {
        let entry: Models.Entry = gs().entries.currentEntry;
        if(entry.ratingEntryId){

        }else{
            Services.createEntry({
                ratingEntryId: null,
                fullname: entry.fullname,
                type: entry.type,
                event: entry.event,
                place: entry.place,
                eventDate: entry.eventDate
            }).then((response) => {
                if(response.status){
                    toastr.success(response.message);
                    d(closeEntry());
                }else{
                    toastr.error(response.message);
                }
            })
        }
    }
}