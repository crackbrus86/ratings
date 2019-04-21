import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Table from "../../../components/table/table";
import { ColumnModel, ColumnTypes } from "../../../components/table/column";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Selectors from "../selectors/selector";

interface StateProps {
    ranges: Models.Range[]
}

interface DispatchProps {
    rangesActions: typeof Actions.RangesActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        ranges: Selectors.upfRanges(state)
    }),
    (dispatch): DispatchProps => ({
        rangesActions: bindActionCreators(Actions.RangesActions.ActionCreators, dispatch)
    })
)(class UPFRangeGrid extends React.Component<StateProps & DispatchProps>{
    render() {
        return <>
            <Table items={this.props.ranges} columns={[
                {
                    title: "Змагання",
                    field: 'name',
                    width: "200px"
                },
                {
                    title: "Місце",
                    field: "place",
                    width: "50px"
                },
                {
                    title: "Дисципліна",
                    field: "compTypeName",
                    width: "200px"
                },
                {
                    title: "Ранг",
                    field: "rangeValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (range: Models.Range) => this.props.rangesActions.saveRange(range)
                },
                {
                    title: "",
                    width: "*"
                }
            ] as ColumnModel[]} />
        </>
    }
})