import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";

interface StateProps{
    competitions: Models.LookupModels.Competition[]
}

interface DispatchProps{
    actions: typeof Actions.LookupActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        competitions: state.lookup.competitions
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch)
    })
)(class RatingsLayout extends React.Component<StateProps & DispatchProps>{
    componentDidMount(){
        this.props.actions.getCompetitions();
    }
    render(){
        return <div>Settings layout
            <ul>
                {
                    this.props.competitions.map((competition, index) => <li key={index}>{`${competition.sortOrder} ${competition.name}`}</li>)
                }
            </ul>
        </div>
    }
})