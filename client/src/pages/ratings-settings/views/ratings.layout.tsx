import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Table from "../../../components/table/table";
import {ColumnModel, ColumnTypes} from "../../../components/table/column";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Selectors from "../selectors/selector";

interface StateProps{
    points: Models.LookupModels.TablePoint[]
}

interface DispatchProps{
    actions: typeof Actions.LookupActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        points: Selectors.getTablePoints(state)
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch)
    })
)(class RatingsLayout extends React.Component<StateProps & DispatchProps>{
    componentDidMount(){
        this.props.actions.getCompetitions();
        this.props.actions.getPoints();
    }
    render(){
        return <div style={{overflowX: "auto", marginRight: 20}}>
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
                    title: "",
                    width: "*"
                }
                ] as ColumnModel[]} />
        </div>
    }
})