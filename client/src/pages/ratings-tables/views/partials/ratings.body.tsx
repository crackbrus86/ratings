import * as React from "react"
import {connect} from "react-redux"
import * as Models from "../../models/index.models"
import * as Components from "../../../../components/index"
import * as Actions from "../../actions/index.actions"
import * as Selectors from "../../selectors/index.selectors"

interface StateProps{
    ratingRecords?: Models.RatingEntry[]
    rating? : string
    showWilks?: boolean
}
interface DispatchProps{
    cleanRatings?: () => void
}

type Props = StateProps & DispatchProps

const mapStateToProps = (state: Models.StoreState):StateProps => ({
    ratingRecords: Selectors.Ratings.getRatings(state),
    rating: state.shell.rating,
    showWilks: Selectors.ShellSelectors.showWilks(state)
})

const mapDispatchToProps = (dispatch): DispatchProps => ({
    cleanRatings: () => dispatch(Actions.RatingEntryActions.ActionCreators.emptyRatingEntries())
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
    function(props: Props){
        React.useEffect(() => {
            return () => props.cleanRatings()
        }, [])
        return <div className="ratings">
            {
                !props.ratingRecords.length && <span><b>{props.rating ? "На жаль, для цього рейтнигу не знайдено жодного запису" : "Оберіть рейтинг у випадаючому списку вище"}</b></span>
            }
            {
                !!props.ratingRecords.length && <>
                    <Components.PrintButton printTargetId="ratingsTab" classNames="print" />
                    <div id="ratingsTab">
                        <Components.Table 
                            items={props.ratingRecords} 
                            columns={[
                                {
                                    title: "П.І.П",
                                    field: "fullname",
                                    width: "300px"
                                },
                                {
                                    title: "К-ть очок",
                                    field: "rating",
                                    width: "100px"
                                },
                                {
                                    title: "Показник по ф-лі IPF",
                                    field: "wilks",
                                    hide: !props.showWilks,
                                    width: "100px"
                                },
                                {
                                    title: "Деталі",
                                    type: Components.ColumnTypes.Button,
                                    icon: "external-link-alt",
                                    width: "100px",
                                    onClick: () => null
                                },
                                {
                                    width: "*"
                                }
                            ] as Components.ColumnModel[]} />
                    </div>
                </>
            }
        </div>
    }
)