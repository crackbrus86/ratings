import * as Services from "../services/lookup.services";
import * as Models from "../models/index.models";
import * as ActionTypes from "./action.types";
import { callApi } from "../../../infrastructure/call.api";
import * as toastr from "toastr";

export namespace ActionCreators {
  export const getCompetitions = () => (d, gs: () => Models.StoreState) => {
    Services.getCompetitions().then((response) => {
      if (response.status) {
        return d({
          type: ActionTypes.LOAD_COMPETITIONS,
          payload: <ActionTypes.LOAD_COMPETITIONS_PAYLOAD>{
            competitions: response.data,
          },
        });
      }
    });
  };

  export const getPoints = () => (d, gs: () => Models.StoreState) => {
    Services.getPoints().then((response) => {
      if (response.status) {
        return d({
          type: ActionTypes.LOAD_POINTS,
          payload: <ActionTypes.LOAD_POINTS_PAYLOAD>{
            points: response.data,
          },
        });
      }
    });
  };

  export const savePoint = (
    point: Models.LookupModels.TablePoint,
    place: number
  ) => (d, gs: () => Models.StoreState) => {
    let value = 0;
    switch (place) {
      case 1:
        value = point.firstPlaceValue;
        break;
      case 2:
        value = point.secondPlaceValue;
        break;
      case 3:
        value = point.thirdPlaceValue;
        break;
      case 4:
        value = point.fourthPlaceValue;
        break;
      case 5:
        value = point.fivethPlaceValue;
        break;
      case 6:
        value = point.sixthPlaceValue;
        break;
      case 7:
        value = point.seventhPlaceValue;
        break;
      case 8:
        value = point.eighthPlaceValue;
        break;
      case 9:
        value = point.ninethPlaceValue;
        break;
      case 10:
        value = point.tenthPlaceValue;
        break;
      case 11:
        value = point.eleventhPlaceValue;
        break;
      case 12:
        value = point.twelvethPlaceValue;
        break;
      case 13:
        value = point.thirteenPlaceValue;
        break;
      case 14:
        value = point.fourteenPlaceValue;
        break;
      case 15:
        value = point.fifteenPlaceValue;
        break;
      case 16:
        value = point.sixteenPlaceValue;
        break;
      default:
        value = 0;
    }

    let currentPoint = gs().lookup.points.filter(
      (x) => x.place == place && x.target == point.dbName
    )[0];

    Services.savePoint({
      pointId: currentPoint ? currentPoint.pointId : null,
      place: place,
      target: point.dbName,
      value: value,
    }).then((response) => {
      if (response.status) {
        toastr.success(response.message);
        d(getPoints());
      }
    });
  };

  export const getRecords = () => (d) => {
    Services.getRecords().then((response) => {
      if (response.status) {
        return d({
          type: ActionTypes.LOAD_RECORDS,
          payload: <ActionTypes.LOAD_RECORDS_PAYLOAD>{
            records: response.data,
          },
        });
      }
    });
  };

  export const loadCompTypes = () => (d, gs: () => Models.StoreState) => {
    Services.getCompTypes().then((response) => {
      if (response.status) {
        return d({
          type: ActionTypes.LOAD_COMP_TYPES,
          payload: <ActionTypes.LOAD_COMP_TYPES_PAYLOAD>response.data,
        });
      }
    });
  };
}
