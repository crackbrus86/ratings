import * as React from "react";
import * as Redux from "redux";
import { Provider } from "react-redux";
import {createRatingsStore} from "./store";
import * as Models from "./models/index.models";
import RatingsLayout from "./views/ratings.layout";
import * as Actions from "./actions/index.actions"

class RatingsTablesIndex extends React.Component{
    store: Redux.Store<Models.StoreState>;
    constructor(props){
        super(props);
        this.store = createRatingsStore();
    }

    componentDidMount(){
        this.store.dispatch(Actions.LookupActions.ActionCreators.loadLookups())
    }

    render(){
        return <Provider store={this.store}>
            <RatingsLayout />
        </Provider>
    }
}

export default RatingsTablesIndex;