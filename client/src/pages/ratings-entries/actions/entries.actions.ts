import * as ActionTypes from "./action.types";
import * as Models from "../models/index.models";
import * as Services from "../services/entry.services";
import * as Actions from "./index.actions"
import * as toastr from "toastr";
toastr.options.timeOut = 5000;

export namespace ActionCreators{
    export const addEntry = () => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.OPEN_ENTRY,
            payload: <ActionTypes.OPEN_ENTRY_PAYLOAD>{
                ratingEntryId: null,
                fullname: '',
                division: null,
                type: Models.EntryType.Place,
                event: null,
                place: null,
                eventDate: new Date(),
                wilks: null,
                coach: '',
                fst: '',
                school: ''
            }
        })
    }

    export const editEntry = (entry: Models.Entry) => (d, gs: () => Models.StoreState) => {
        let entryData = gs().entries.entries.find(x => x.ratingEntryId == entry.ratingEntryId);
        d({
            type: ActionTypes.OPEN_ENTRY,
            payload: <ActionTypes.OPEN_ENTRY_PAYLOAD>{
                ...entryData,
                eventDate: new Date(entryData.eventDate)
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
        if(field == "type" || field == "division") { 
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

    export const saveAndCloseEntry = () => (d, gs: () => Models.StoreState) => {
        let entry: Models.Entry = gs().entries.currentEntry;
        if(entry.ratingEntryId){
            Services.updateEntry({
                ...entry
            }).then((response) => {
                if(response.status){
                    toastr.success(response.message);
                    d(closeEntry());
                    d(getEntries());
                }else{
                    toastr.error(response.message);
                }
            })
        }else{
            Services.createEntry({
                ...entry,
                ratingEntryId: null
            }).then((response) => {
                if(response.status){
                    toastr.success(response.message);
                    d(closeEntry());
                    d(getEntries());
                }else{
                    toastr.error(response.message);
                }
            })
        }
    }

    export const saveEntry = () => (d, gs: () => Models.StoreState) => {
        let entry: Models.Entry = gs().entries.currentEntry;
        if(entry.ratingEntryId){
            Services.updateEntry({
                ...entry
            }).then((response) => {
                if(response.status){
                    toastr.success(response.message);
                    d(updateEntry("ratingEntryId", null));
                    d(getEntries());
                }else{
                    toastr.error(response.message);
                }
            })
        }else{
            Services.createEntry({
                ...entry,
                ratingEntryId: null
            }).then((response) => {
                if(response.status){
                    toastr.success(response.message);
                    d(updateEntry("ratingEntryId", null));
                    d(getEntries());
                }else{
                    toastr.error(response.message);
                }
            })
        }
    }

    export const getEntries = () => (d, gs: () => Models.StoreState) => {
        Services.getEntries({
            year: gs().shell.startDate.getFullYear()
        }).then((response) => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_ENTRIES,
                    payload: <ActionTypes.LOAD_ENTRIES_PAYLOAD>{ entries: response.data }
                });
                d(Actions.LookupActions.ActionCreators.loadNames())
            }else{
                toastr.error(response.message);
            }
        });
    }

    export const deleteEntry = () => (d, gs: () => Models.StoreState) => {
        Services.deleteEntry({
            ratingEntryId: gs().entries.deleteById
        }).then((response) => {
            if(response.status){
                toastr.success(response.message);
                d(cancelRemove());
                d(getEntries());
            }else{
                toastr.error(response.message);
            }
        })
    }

    export const selectToRemove = (id: number) => (d) => {
        d({
            type: ActionTypes.SELECT_TO_REMOVE,
            payload: <ActionTypes.SELECT_TO_REMOVE_PAYLOAD>{id}
        })
    }

    export const cancelRemove = () => (d) => {
        d({type: ActionTypes.CANCEL_REMOVE});
    }
}