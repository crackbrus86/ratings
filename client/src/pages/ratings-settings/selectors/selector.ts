import {createSelector} from "reselect";
import * as Models from "../models/index.models";

const competitions = (state: Models.StoreState) => state.lookup.competitions;
const points = (state: Models.StoreState) => state.lookup.points;
const records = (state: Models.StoreState) => state.lookup.records;
const compTypes = (state: Models.StoreState) => state.lookup.compTypes;
const uRanges = (state: Models.StoreState) => state.ranges.ranges;

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

export const upfRanges = createSelector(competitions, compTypes, uRanges, records,  (comp, types, uRanges, records) => {
    let ranges: Models.Range[] = [];
    let counter = 1;
    comp.filter(c => !!c.ratingUPF).map(c => {
        for(var i = 1; i < 4; i++){
            let range: Models.Range = {
                comp: c.dbName,
                name: c.name,
                place: i,
                compType: (c.dbName != "WorldGames" && c.dbName != "EuropeanCup") ? "PL" : null,
                compTypeName: null,
                rangeValue: null
            }
            if(range.comp != "WorldGames" && range.comp != "EuropeanCup"){
                for(var j = 0; j < types.length; j++){
                    range = {
                        ...range,
                        compType: types[j].name,
                        compTypeName: types[j].displayName,
                        sortOrder: counter
                    }
                    ranges = ranges.concat(range);
                    counter++;
                }
            }else{
                range = {
                    ...range,
                    sortOrder: counter
                }
                ranges = ranges.concat(range);
                counter++;
            }
        }

    })
    records.map(r => {
        let range: Models.Range = {
            comp: r.dbName,
            name: r.name,
            place: 1,
            rangeValue: null
        }
        for(var i = 0; i < types.length; i++){
            range = {
                ...range,
                compType: types[i].name,
                compTypeName: types[i].displayName,
                sortOrder: counter
            }
            ranges = ranges.concat(range);
            counter++;
        }
    })

    return ranges.map(r => getRangeValue(r, uRanges));
});

function getRangeValue(range: Models.Range, ranges: Models.UPFRange[]){
    var upfRange = ranges.find(r => r.id == range.sortOrder || (r.competition == range.comp && r.compType == range.compType && r.place == range.place));
    range.rangeValue = !!upfRange ? upfRange.range : 0;
    return range;
}