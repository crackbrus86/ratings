import {createSelector} from "reselect";
import * as Models from "../models/index.models";

const competitions = (state: Models.StoreState) => state.lookup.competitions;
const points = (state: Models.StoreState) => state.lookup.points;

export const getTablePoints = createSelector(competitions, points, (competitions, points) => {
    if(!competitions.length || !points.length) return [];
    return competitions.map(competition => {
        let compPoints = points.filter(point => point.target == competition.dbName);
        return {
        ...competition,
        firstPlaceValue: compPoints.filter(point => point.place == 1)[0].value,
        secondPlaceValue: compPoints.filter(point => point.place == 2)[0].value,
        thirdPlaceValue: compPoints.filter(point => point.place == 3)[0].value
    } as Models.LookupModels.TablePoint});
});
