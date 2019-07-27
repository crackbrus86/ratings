import * as ActionTypes from "./types/action.types"
import * as Models from "../models/index.models"
import * as Services from "../services/index.servces"
import * as toastr from "toastr"
toastr.options.timeOut = 5000

export namespace ActionCreators{
    export const loadRefereeEntries = () => (d, gs: () => Models.StoreState) => {
        Services.RefereeEntryServices.getAll({
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
            payload: {...entry} as ActionTypes.SELECT_REFEREE_ENTRY_PAYLOAD
        })
    }

    export const closeRefereeEntry = () => (d, gs: () => Models.StoreState) => {
        d({
            type: ActionTypes.CLOSE_REFEREE_ENTRY
        })
    }

    export const createRefereeEntry = (entry: Models.RefereeEntry, closeOnSuccess: boolean = false) => (d, gs: () => Models.StoreState) => {
        Services.RefereeEntryServices.create(entry).then(response => {
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
        Services.RefereeEntryServices.update(entry).then(response => {
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
}