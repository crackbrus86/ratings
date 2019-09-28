import * as ActionTypes from "./types/action.types"
import * as Models from "../models/index.models"
import * as Services from "../services/index.servces"
import * as toastr from "toastr"
toastr.options.timeOut = 5000

export namespace ActionCreators{
    export const loadRefereeEntries = () => (d, gs: () => Models.StoreState) => {
        Services.RefereeEntry.getAll({
            year: gs().shell.startDate.getFullYear()
        }).then(response => {
            if(response.status){
                d({
                    type: ActionTypes.LOAD_REFEREE_ENTRIES,
                    payload: response.data as ActionTypes.LOAD_REFEREE_ENTRIES_PAYLOAD
                })
            }else{
                toastr.error(response.message)
            }
        })
    }

    export const editRefereeEntry = (entry: Models.RefereeEntry) => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.SELECT_REFEREE_ENTRY,
            payload: {...entry, eventDate: new Date(entry.eventDate)} as ActionTypes.SELECT_REFEREE_ENTRY_PAYLOAD
        })
    }

    export const closeRefereeEntry = () => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.CLOSE_REFEREE_ENTRY
        })
    }

    export const createRefereeEntry = (entry: Models.RefereeEntry, closeOnSuccess: boolean = false) => (d, gs: () => Models.StoreState) => {
        Services.RefereeEntry.create(entry).then(response => {
            if(response.status){
                if(closeOnSuccess) d(closeRefereeEntry())
                toastr.success(response.message)
                d(loadRefereeEntries())
            }else{
                toastr.error(response.message) 
            }
        })
    }

    export const updateRefereeEntry = (entry: Models.RefereeEntry, closeOnSuccess: boolean = false) => (d, gs: () => Models.StoreState) => {
        Services.RefereeEntry.update(entry).then(response => {
            if(response.status){
                if(closeOnSuccess) d(closeRefereeEntry())
                toastr.success(response.message)
                d(loadRefereeEntries())
            }else{
                toastr.error(response.message) 
            }
        })
    }

    export const saveRefereeEntry = (entry: Models.RefereeEntry, closeOnSuccess: boolean = false) => (d, gs: () => Models.StoreState) => {
        if(!entry.id){
            d(createRefereeEntry(entry, closeOnSuccess))
        }else{
            d(updateRefereeEntry(entry, closeOnSuccess))
        }
    }

    export const addRefereeEntry = () => (d) => {
        d({
            type: ActionTypes.SELECT_REFEREE_ENTRY,
            payload: {id: null, fullname: null, activity: null, event: null, eventDate: new Date()} as ActionTypes.SELECT_REFEREE_ENTRY_PAYLOAD
        })
    }

    export const selectToRemove = (id: number) => (d) => {
        d({
            type: ActionTypes.SELECT_TO_REMOVE,
            payload: id as ActionTypes.SELECT_TO_REMOVE_PAYLOAD
        })
    }

    export const cancelRemove = () => (d) => {
        d({type: ActionTypes.CANCEL_REMOVE})
    }

    export const removeEntry = () => (d, gs: () => Models.StoreState) => {
        Services.RefereeEntry.remove({id: gs().refereeEntries.deleteById}).then(response => {
            if(response.status){
                toastr.success(response.message)
                d(cancelRemove())
                d(loadRefereeEntries())
            }else{
                toastr.error(response.message)
            }
        })
    }
}