import * as React from "react"
import {connect} from "react-redux"
import * as Components from "../../../components/index"
import * as Models from "../models/index.models"
import * as Actions from "../actions/index.actions"
import * as Selectors from "../selectors/index.selectors"

interface StateProps{
    entry?: Models.RatingEntry
    rating?: Models.Rating
    showWilks?: boolean
}

interface DispatchProps{
    onClose?: () => void
}

const mapStateToProps = (state: Models.StoreState): StateProps => ({
    entry: Selectors.Ratings.getEntryDetails(state),
    rating: Selectors.Ratings.getCurrentRating(state),
    showWilks: Selectors.ShellSelectors.showWilks(state)
})

const mapDispatchToProps = (dispatch): DispatchProps => ({
    onClose: () => dispatch(Actions.RatingEntryActions.ActionCreators.closeEntryDetails())
})

type Props = StateProps & DispatchProps

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
    (props: Props) => {
        return props.entry && <Components.Modal className="rating-details-modal">
            <Components.Modal.Header title={props.entry.fullname} onClose={props.onClose} />
            <Components.Modal.Body>
                <Components.Layout.ContentWrap id="ratingDetailsList">
                    <Components.Form>
                        <Components.Form.TextInput 
                        label={props.rating.organization == "ministry" ? "Кількість очок" : "Ранг"} 
                        value={props.entry.rating}
                        readonly
                        />
                        {props.showWilks && <Components.Form.TextInput 
                            label="Показник по формулі IPF"
                            value={props.entry.wilks}
                            readonly
                        />}
                        <div dangerouslySetInnerHTML={{__html: props.entry.details}}></div>
                    </Components.Form>
                </Components.Layout.ContentWrap>
            </Components.Modal.Body>
            <Components.Modal.Footer>
                <Components.PrintButton printTargetId="ratingDetailsList" classNames="print" />
            </Components.Modal.Footer>
        </Components.Modal>
    }
)