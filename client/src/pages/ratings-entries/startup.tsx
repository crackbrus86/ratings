import * as React from "react";
import * as Redux from "redux";
import  {Provider} from "react-redux";
import {createRatingEntryStore} from "./store";
import * as Models from "./models/index.models";
import RatingEntryRoot from "./views/root";

export default class RatingEntryIndex extends React.Component{
    store: Redux.Store<Models.StoreState>
    constructor(props){
        super(props);
        this.store = createRatingEntryStore();
    }

    render(){
        return <Provider store={this.store}>
            <RatingEntryRoot />
        </Provider>
    }
}