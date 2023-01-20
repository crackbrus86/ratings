import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Table from "../../../components/table/table";
import { ColumnModel, ColumnTypes } from "../../../components/table/column";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";

interface StateProps {
}
interface OwnProps {
    points: Models.LookupModels.TablePoint[]
}

interface DispatchProps {
    actions: typeof Actions.LookupActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch)
    })
)(class RecordsRatingsGrid extends React.Component<StateProps & OwnProps & DispatchProps>{
    render() {
        return <>
            <Table items={this.props.points} columns={[
                {
                    title: "№",
                    field: "sortOrder",
                    width: "100px",
                    sortable: true
                },
                {
                    title: "Рекорд",
                    field: "name",
                    width: "300px"
                },
                {
                    title: "Бали",
                    field: "firstPlaceValue",
                    type: ColumnTypes.Input,
                    width: "80px",
                    sortable: true,
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 1)
                },
                {
                    title: "",
                    width: "*"
                }
            ] as ColumnModel[]} />
        </>
    }
})