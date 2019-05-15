import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import * as Selectors from "../../selectors/index.selector";
import Table from "../../../../components/table/table";
import {ColumnModel, ColumnTypes} from "../../../../components/table/column";
import PrintButton from "../../../../components/print button/print.button";

interface StateProps{
    ratings: Models.Rating[]
}

interface DispatchProps{
    actions: typeof Actions.RatingsActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState):StateProps => ({
        ratings: Selectors.RatingSelector.modifiedUPFCoachRatings(state)
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.RatingsActions.ActionCreators, dispatch)
    })
)(class UPFCoachRatings extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.loadUPFCoachRatings();
    }

    render(){
        return <div className="ratings">
            <PrintButton printTargetId="upfCoachRatings" classNames="print" />
            <div id="upfCoachRatings">
                <Table 
                    items={this.props.ratings}
                    columns={[
                        {
                            title: "П.І.П.",
                            field: "fullname",
                            width: "250px"
                        },
                        {
                            title: "Ранг",
                            field: "rating",
                            width: "50px"
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
})