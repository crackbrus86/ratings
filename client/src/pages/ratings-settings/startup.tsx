import * as React from "react";
import * as Redux from "redux";
import { Provider } from "react-redux";
import * as Models from "./models/index.models";
import {createSettingsStore} from "./store";
import RatingsLayout from "./views/ratings.layout";

export default class SettingsIndex extends React.Component{
    store: Redux.Store<Models.StoreState>;
    constructor(props){
        super(props);
        this.store = createSettingsStore();
    }

    render(){
        return <Provider store={this.store}>
            <RatingsLayout />
        </Provider>
    }
}