import * as React from "react"
import {connect} from "react-redux"
import * as Models from "../models/index.models"
import * as Actions from "../actions/index.actions"
import * as Components from "../../../components"
import * as Selectors from "../selectors/index.selectors"

interface StateProps{
    ratings?: Models.Rating[]
    ratingTypes?: Models.RatingType[]
}

interface DispatchProps{
    loadRatings?: () => void
    changeRatingType?: (ratingType: string) => void
}

const mapStateToProps = (state: Models.StoreState): StateProps => ({
    ratings: Selectors.Rating.refereeRatings(state),
    ratingTypes: state.lookup.ratingTypes
})

const mapDispatchToProps = (dispatch):DispatchProps => ({
    loadRatings: () => dispatch(Actions.Ratings.getRating()),
    changeRatingType: (type) => dispatch(Actions.Ratings.changeRatingType(type))
})

type Props = StateProps & DispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(
    function refereeRatingView(props: Props){
        React.useEffect(() => {
            props.loadRatings()
        },[])

        const ratingType = props.ratingTypes.find(x => x.ratingType == Models.RatingTypes.MinReferee)

        return <div className="ratings">
            <Components.PrintButton printTargetId="referee-rating" classNames="print" />
            {!!ratingType && <Components.Form>
                <Components.Form.CheckBox 
                    label="Показати на сайті" 
                    className="ratings-activity"
                    isChecked={ratingType.isActive} 
                    onChange={() => props.changeRatingType(ratingType.ratingType)} />
            </Components.Form> }
            <div id="referee-rating">
                <Components.Table items={props.ratings} columns={[
                    {
                        title: "Місце",
                        type: Components.ColumnTypes.No,
                        width: "30px"
                    },
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
                        type: Components.ColumnTypes.Html,
                        width: "*"
                    }
                ] as Components.ColumnModel[]} />
            </div>
        </div>
    }
)

