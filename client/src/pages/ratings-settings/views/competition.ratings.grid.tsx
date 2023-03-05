import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Selectors from '../selectors/selector';
import Table from "../../../components/table/table";
import { ColumnModel, ColumnTypes } from "../../../components/table/column";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";

interface StateProps {
    competitionPoints: Models.LookupModels.TablePoint[]
}
interface DispatchProps {
    actions: typeof Actions.LookupActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        competitionPoints: Selectors.getCompetitionsTablePoints(state)
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch)
    })
)(class CompetitionRatingsGrid extends React.Component<StateProps & DispatchProps>{
    render() {
        return <>
            <Table items={this.props.competitionPoints} columns={[
                {
                    title: "№",
                    field: "sortOrder",
                    width: "50px",                    
                    sortable: true
                },
                {
                    title: "Вид змагань",
                    field: "name",
                    width: "250px"
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
                    title: "9-е місце",
                    field: "ninethPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "80px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 9)
                },
                {
                    title: "10-е місце",
                    field: "tenthPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "90px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 10)
                },
                {
                    title: "11-е місце",
                    field: "eleventhPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "90px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 11)
                },
                {
                    title: "12-е місце",
                    field: "twelvethPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "90px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 12)
                },
                {
                    title: "13-е місце",
                    field: "thirteenPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "90px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 13)
                },
                {
                    title: "14-е місце",
                    field: "fourteenPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "90px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 14)
                },    
                {
                    title: "15-е місце",
                    field: "fifteenPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "90px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 15)
                },
                {
                    title: "16-е місце",
                    field: "sixteenPlaceValue",
                    type: ColumnTypes.Input,
                    sortable: true,
                    width: "90px",
                    onChange: (item: Models.LookupModels.TablePoint) => this.props.actions.savePoint(item, 16)
                },                                         
                {
                    title: "",
                    width: "*"
                }
            ] as ColumnModel[]} />
        </>
    }
})