import {createStore, applyMiddleware} from "redux";
import * as Reducers from "./reducers/index.reducer";
import thunk from "redux-thunk";
import {logger} from "redux-logger";

export const createRefereeStore = () => {
    return createStore(Reducers.reducer, applyMiddleware(logger, thunk));
}

