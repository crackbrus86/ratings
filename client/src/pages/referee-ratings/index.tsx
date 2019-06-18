import * as React from "react";
import * as Redux from "redux";
import {Provider} from "react-redux"
import * as ReactDOM from "react-dom";
import RefereeTabs from "./views/referee.tabs";
import {createRefereeStore} from "./store";
import * as Models from "./models/index.models";

ReactDOM.render(<RefereeRatingsApp />, document.getElementById("app-referee-rat"));

function RefereeRatingsApp(){
    let store: Redux.Store<Models.StoreState> = createRefereeStore();
    return <>
        <Provider store={store}>
            <RefereeTabs />
        </Provider>
    </>
}