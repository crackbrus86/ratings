import { createSelector} from "reselect";
import * as Models from "../models/index.models";
import {SelectOption} from "../../../components/form/select"

const competitions = (state: Models.StoreState) => state.lookup.competitions;
const records = (state: Models.StoreState) => state.lookup.records;
const currentEntry = (state: Models.StoreState) => state.entries.currentEntry;
const divisions = (state: Models.StoreState) => state.lookup.divisions;
const compTypes = (state: Models.StoreState) => state.lookup.compTypes;

export const eventList = createSelector(competitions, records, currentEntry, (competitions, records, entry) => {
    let list: Models.Competition[] | Models.Record[] = entry && entry.type == Models.EntryType.Place ? competitions : records;
    let options = [{text: '', value: null}];
    options = options.concat(list.map(item => ({text: item.name, value: item.dbName }) as SelectOption));
    if(!!entry) options = filteByDivision(entry.division, options);
    return options;
});

function filteByDivision(division: string, options: SelectOption[]): SelectOption[]{
    switch(division){
        case Models.DivisionName.Open:
            return options.filter(opt => !opt.value || opt.value.indexOf(Models.DivisionName.Junior) == -1 && opt.value.indexOf(Models.DivisionName.SubJunior));
        case Models.DivisionName.Junior:
            return options.filter(opt => !opt.value || opt.value.indexOf(Models.DivisionName.Junior) != -1 && opt.value.indexOf(Models.DivisionName.SubJunior) == -1);
        case Models.DivisionName.SubJunior:
            return options.filter(opt => !opt.value || opt.value.indexOf(Models.DivisionName.SubJunior) != -1)
        default:
            return options;
    }
}

export const divisionList = createSelector(divisions, (divisions) => {
    let list: SelectOption[] = [{text: "", value: null}];
    list = list.concat(divisions.map(d => ({text: d.displayName, value: d.name}) as SelectOption));
    return list;
})

export const compTypesList = createSelector(compTypes, (types) => {
    let list: SelectOption[] = [{text: "", value: null }];
    list = list.concat(types.map(t => ({text: t.displayName, value: t.name}) as SelectOption));
    return list;
})

export interface EntryValidationResult{
    isValid: boolean,
    isFullNameValid: Models.ValidationResult,
    isDivisionValid: Models.ValidationResult,
    isEventValid: Models.ValidationResult,
    isPlaceValid: Models.ValidationResult,
    isEventDateValid: Models.ValidationResult,
    isGenderValid: Models.ValidationResult,
    isComTypeValid: Models.ValidationResult
}

export const validation = createSelector(currentEntry, (entry) => {
    let result: EntryValidationResult = {
        isValid: true,
        isFullNameValid: {isValid: true, message: null},
        isDivisionValid: {isValid: true, message: null},
        isEventValid: {isValid: true, message: null},
        isPlaceValid: {isValid: true, message: null},
        isEventDateValid: {isValid: true, message: null},
        isGenderValid: {isValid: true, message: null},
        isComTypeValid: {isValid: true, message: null}
    }

    if(entry && !entry.fullname.length){
        result.isFullNameValid = {isValid: false, message: "Прізвище та ім'я спортсмена є обов'язковими!"}
    }
    if(entry && !entry.division){
        result.isDivisionValid = {isValid: false, message: "Дивізіон є обов'язковим!"}
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
    if(entry && !entry.compType){
        result.isComTypeValid = {isValid: false, message: "Не вказано дисципліну!"}
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