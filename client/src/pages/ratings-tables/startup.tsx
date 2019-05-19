import * as React from "react";
import * as Redux from "redux";
import { Provider } from "react-redux";
import {createRatingsStore} from "./store";
import * as Models from "./models/index.models";
import RatingsLayout from "./views/ratings.layout";

class RatingsTablesIndex extends React.Component{
    store: Redux.Store<Models.StoreState>;
    constructor(props){
        super(props);
        this.store = createRatingsStore();
    }
    render(){
        return <Provider store={this.store}>
            <RatingsLayout />
        </Provider>
    }
}

export default RatingsTablesIndex;