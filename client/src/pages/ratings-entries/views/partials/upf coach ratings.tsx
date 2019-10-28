import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import * as Selectors from "../../selectors/index.selector";
import Table from "../../../../components/table/table";
import {ColumnModel, ColumnTypes} from "../../../../components/table/column";
import PrintButton from "../../../../components/print button/print.button";
import * as Components from "../../../../components/index"

interface StateProps{
    ratings: Models.Rating[]
    ratingTypes?: Models.RatingType[]
}

interface DispatchProps{
    actions: typeof Actions.RatingsActions.ActionCreators
    changeRatingType?: (ratingType: string) => void
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState):StateProps => ({
        ratings: Selectors.RatingSelector.modifiedUPFCoachRatings(state),
        ratingTypes: state.lookup.ratingTypes
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.RatingsActions.ActionCreators, dispatch),
        changeRatingType: (type) => dispatch(Actions.LookupActions.ActionCreators.changeRatingType(type))
    })
)(class UPFCoachRatings extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.loadUPFCoachRatings();
    }

    render(){
        let ratingType = this.props.ratingTypes.find(x => x.ratingType == Models.RatingTypes.UpfCoach) 
        return <div className="ratings">
            <PrintButton printTargetId="upfCoachRatings" classNames="print" />
            { !!ratingType && <Components.Form>
                <Components.Form.CheckBox 
                    label="Показати на сайті" 
                    isChecked={ratingType.isActive} 
                    onChange={() => this.props.changeRatingType(ratingType.ratingType)} 
                    className="ratings-activity" />
                </Components.Form> }
            <div id="upfCoachRatings">
                <Table 
                    items={this.props.ratings}
                    columns={[
                        {
                            title: "Місце",
                            type: ColumnTypes.No,
                            width: "30px"
                        },
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