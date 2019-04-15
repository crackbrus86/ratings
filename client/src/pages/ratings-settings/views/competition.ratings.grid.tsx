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
)(class CompetitionRatingsGrid extends React.Component<StateProps & OwnProps & DispatchProps>{
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
                    title: "Вид змагань",
                    field: "name",
                    width: "300px"
                },
                {
                    title: "1-е місце",
                    field: "firstPlaceValue",
                    type: ColumnTypes.Input,
                    width: "80px",
                    sortable: true,
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 1)
                },
                {
                    title: "2-е місце",
                    field: "secondPlaceValue",
                    type: ColumnTypes.Input,
                    width: "80px",
                    sortable: true,
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 2)
                },
                {
                    title: "3-е місце",
                    field: "thirdPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 3)
                },
                {
                    title: "4-е місце",
                    field: "fourthPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 4)
                },
                {
                    title: "5-е місце",
                    field: "fivethPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 5)
                },
                {
                    title: "6-е місце",
                    field: "sixthPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 6)
                },
                {
                    title: "7-е місце",
                    field: "seventhPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 7)
                },
                {
                    title: "8-е місце",
                    field: "eighthPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 8)
                },                                                                
                {
                    title: "",
                    width: "*"
                }
            ] as ColumnModel[]} />
        </>
    }
})