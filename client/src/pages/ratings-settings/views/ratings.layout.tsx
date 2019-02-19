import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Table from "../../../components/table/table";
import {ColumnModel} from "../../../components/table/column";
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
        return <div style={{overflowX: "auto", marginRight: 20}}>
            <Table items={this.props.competitions} columns={[
                {
                    title: "№",
                    field: "sortOrder",
                    width: "100px"
                },
                {
                    title: "Вид змагань",
                    field: "name",
                    width: "300px"
                },
                {
                    title: "",
                    width: "*"
                }
                ] as ColumnModel[]} />
        </div>
    }
})