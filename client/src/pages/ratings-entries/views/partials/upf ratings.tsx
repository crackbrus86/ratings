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
    ratingTypes?: Models.RatingType[]
}

interface DispatchProps{
    actions: typeof Actions.RatingsActions.ActionCreators
    changeRatingType?: (ratingType: string) => void
}

export default connect<StateProps, DispatchProps, OwnProps>(
    (state: Models.StoreState):StateProps => ({
        ratingsMale: Selectors.RatingSelector.upfRatingsMale(state),
        ratingsFemale: Selectors.RatingSelector.upfRatingsFemale(state),
        ratingTypes: state.lookup.ratingTypes
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.RatingsActions.ActionCreators, dispatch),
        changeRatingType: (type) => dispatch(Actions.LookupActions.ActionCreators.changeRatingType(type))
    })
)(class UPFRatings extends React.Component<StateProps & DispatchProps & OwnProps>{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.actions.loadUPFRatings();
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
        let ratingType = this.props.ratingTypes.find(x => (this.props.ratingFilter == "Male" && x.ratingType == Models.RatingTypes.UpfAthMale) || 
        (this.props.ratingFilter == "Female" && x.ratingType == Models.RatingTypes.UpfAthFemale))
        return <div  className="ratings">
                <PrintButton printTargetId="upfRatings" classNames="print" />
                <Components.ExportToWord sourceId="upfRatings" classNames="export" docTitle="Reitynhy_FPU.doc" />
                { !!ratingType && <Components.Form>
                <Components.Form.CheckBox 
                    label="Показати на сайті" 
                    isChecked={ratingType.isActive} 
                    onChange={() => this.props.changeRatingType(ratingType.ratingType)} 
                    className="ratings-activity" />
                </Components.Form> }
                <div id="upfRatings">
                    <Table 
                    items={this.getRatings()}
                    columns={[
                        {
                            title: "Місце",
                            type: ColumnTypes.No,
                            width: "30px"
                        },
                        {
                            title: "П.І.П",
                            field: "fullname",
                            width: "300px",
                        },
                        {
                            title: "Ранг",
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