import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/index.actions";
import * as Models from "../models/index.models";
import Layout from "./layout";

interface StateProps{

}

interface DispatchProps{
    lookupActions: typeof Actions.LookupActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({

    }),
    (dispatch): DispatchProps => ({
        lookupActions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch)
    })
)(class RatingEntryRoot extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.lookupActions.loadCompetitions();
    }

    render(){
        return <><Layout /></>
    }
})