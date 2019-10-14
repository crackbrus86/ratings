import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import Table from "../../../../components/table/table";
import {ColumnModel, ColumnTypes} from "../../../../components/table/column";
import PrintButton from "../../../../components/print button/print.button";
import * as Selectors from "../../selectors/index.selector";
import * as Components from "../../../../components/index"

export interface OwnProps{
    ratingFilter: string
}
interface StateProps{
    ratingsMale: Models.Rating[],
    ratingsFemale: Models.Rating[]
}

interface DispatchProps{
    actions: typeof Actions.RatingsActions.ActionCreators
}

export default connect<StateProps, DispatchProps, OwnProps>(
    (state: Models.StoreState):StateProps => ({
        ratingsMale: Selectors.RatingSelector.ministryRatingsMale(state),
        ratingsFemale: Selectors.RatingSelector.ministryRatingsFemale(state)
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.RatingsActions.ActionCreators, dispatch)
    })
)(class MinistryRatings extends React.Component<StateProps & DispatchProps & OwnProps>{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.loadMinistryRatings();
    }

    getRatings = () => {
        switch(this.props.ratingFilter){
            case "Male":
                return this.props.ratingsMale;
            case "Female":
                return this.props.ratingsFemale;
            default:
                return [];
        }
    }

    render(){
        return <div  className="ratings">
            <PrintButton printTargetId="ministryRatings" classNames="print" />
            <Components.Form><Components.Form.CheckBox label="Показати на сайті" isChecked={true} className="ratings-activity" /></Components.Form>
            <div id="ministryRatings">
                <Table 
                    items={this.getRatings()}
                    columns={[
                        {
                            title: "П.І.П",
                            field: "fullname",
                            width: "300px",
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
                            width: "300px"
                        },
                        {
                            title: "Показник по ф-лі IPF",
                            field: "wilks",
                            width: "150px"
                        },
                        {
                            title: "",
                            width: "*"
                        }
                    ] as ColumnModel[]}
                />
            </div>
        </div>
    }
})