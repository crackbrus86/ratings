import { createSelector} from "reselect";
import * as Models from "../models/index.models";
import {SelectOption} from "../../../components/form/select"

const competitions = (state: Models.StoreState) => state.lookup.competitions;
const records = (state: Models.StoreState) => state.lookup.records;
const currentEntry = (state: Models.StoreState) => state.entries.currentEntry;

export const eventList = createSelector(competitions, records, currentEntry, (competitions, records, entry) => {
    let list: Models.Competition[] | Models.Record[] = entry && entry.type == Models.EntryType.Place ? competitions : records;
    let options = [{text: '', value: null}];
    options = options.concat(list.map(item => ({text: item.name, value: item.dbName }) as SelectOption));
    return options;
});

export interface EntryValidationResult{
    isValid: boolean,
    isFullNameValid: Models.ValidationResult,
    isEventValid: Models.ValidationResult,
    isPlaceValid: Models.ValidationResult,
    isEventDateValid: Models.ValidationResult,
    isGenderValid: Models.ValidationResult
}

export const validation = createSelector(currentEntry, (entry) => {
    let result: EntryValidationResult = {
        isValid: true,
        isFullNameValid: {isValid: true, message: null},
        isEventValid: {isValid: true, message: null},
        isPlaceValid: {isValid: true, message: null},
        isEventDateValid: {isValid: true, message: null},
        isGenderValid: {isValid: true, message: null}
    }

    if(entry && !entry.fullname.length){
        result.isFullNameValid = {isValid: false, message: "Прізвище та ім'я спортсмена є обов'язковими!"}
    }
    if(entry && !entry.event){
        result.isEventValid = {isValid: false, message: `Назва ${entry.type == Models.EntryType.Place ? 'змагань' : 'рекорду'} є обов'язковою!`}
    }
    if(entry && entry.type == Models.EntryType.Place && !entry.place){
        result.isPlaceValid = {isValid: false, message: "Не вказано зайняте місце!"}
    }
    if(entry && (!entry.eventDate || isNaN(entry.eventDate.getTime()))){
        result.isEventDateValid = {isValid: false, message: "Не вірно вказано дату!"}
    }
    if(entry && !entry.gender){
        result.isGenderValid = {isValid: false, message: "Не вказано стать!"}
    }
    result = validate(result);
    return result;
});

function validate(result: EntryValidationResult){
    for(var field in result){
        if(field != 'isValid' && !result[field].isValid){
            result.isValid = false;
            break;
        }
    }
    return result;
}