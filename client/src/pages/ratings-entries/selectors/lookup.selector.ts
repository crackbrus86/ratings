import {createSelector} from "reselect";
import * as Models from "../models/index.models";
import {SelectOption} from "../../../components/form/select"

const regions = (state: Models.StoreState) => state.lookup.regions;

export const regionsList = createSelector(regions, (regions) => {
    let regionsList: SelectOption[] = [{text: '', value: null}];
    regionsList = regionsList.concat(regions.map(region => ({text: region.title, value: region.title} as SelectOption)))
    return regionsList;
})