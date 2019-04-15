import {createSelector} from "reselect";
import * as Models from "../models/index.models";

const competitions = (state: Models.StoreState) => state.lookup.competitions;
const points = (state: Models.StoreState) => state.lookup.points;
const records = (state: Models.StoreState) => state.lookup.records;

export const getCompetitionsTablePoints = createSelector(competitions, points, (competitions, points) => {
    if(!competitions.length) return [];
    return competitions.map(competition => {
        let compPoints = points.filter(point => point.target == competition.dbName);
        return {
        ...competition,
        firstPlaceValue: compPoints.filter(point => point.place == 1).length ? compPoints.filter(point => point.place == 1)[0].value : 0,
        secondPlaceValue: compPoints.filter(point => point.place == 2).length ? compPoints.filter(point => point.place == 2)[0].value : 0,
        thirdPlaceValue: compPoints.filter(point => point.place == 3).length ? compPoints.filter(point => point.place == 3)[0].value : 0,
        fourthPlaceValue: compPoints.filter(point => point.place == 4).length ? compPoints.filter(point => point.place == 4)[0].value : 0,
        fivethPlaceValue: compPoints.filter(point => point.place == 5).length ? compPoints.filter(point => point.place == 5)[0].value : 0,
        sixthPlaceValue: compPoints.filter(point => point.place == 6).length ? compPoints.filter(point => point.place == 6)[0].value : 0,
        seventhPlaceValue: compPoints.filter(point => point.place == 7).length ? compPoints.filter(point => point.place == 7)[0].value : 0,
        eighthPlaceValue: compPoints.filter(point => point.place == 8).length ? compPoints.filter(point => point.place == 8)[0].value : 0,
    } as Models.LookupModels.TablePoint});
});


export const getRecordsTablepoints = createSelector(records, points, (records, points) => {
    if(!records.length) return [];
    return records.map(record => {
        let recordPoints = points.filter(point => point.target == record.dbName);
        return {
            ...record,
            firstPlaceValue: recordPoints.filter(point => point.place == 1).length ? recordPoints.filter(point => point.place == 1)[0].value : 0
        } as Models.LookupModels.TablePoint
    });
});