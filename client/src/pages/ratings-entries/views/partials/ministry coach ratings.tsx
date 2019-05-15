import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import Table from "../../../../components/table/table";
import {ColumnModel, ColumnTypes} from "../../../../components/table/column";
import * as Selectors from "../../selectors/index.selector";
import PrintButton from "../../../../components/print button/print.button";


interface StateProps{
    ratings: Models.Rating[]
}

interface DispatchProps{
    actions: typeof Actions.RatingsActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState):StateProps => ({
        ratings: Selectors.RatingSelector.modifiedMinistryCoachRatings(state)
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.RatingsActions.ActionCreators, dispatch)
    })
)(class MinistryCoachRatings extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.loadMinistryCoachRatings();
    }

    render(){
        return <div className="ratings">
            <PrintButton printTargetId="ministryCoachRatings" classNames="print" />
            <div id="ministryCoachRatings">
                <Table 
                    items = {this.props.ratings}
                    columns={[
                        {
                            title: "П.І.П.",
                            field: "fullname",
                            width: "250px"
                        },
                        {
                            title: "К-ть очок",
                            field: "rating",
                            width: "100px"
                        },
                        {
                            title: "Деталі",
                            field: "details",
                            type: ColumnTypes.Html,
                            width: "*"
                        }
                    ] as ColumnModel[]}
                />
            </div>
        </div>
    }
});