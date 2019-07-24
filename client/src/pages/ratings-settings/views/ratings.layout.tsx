import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Components from "../../../components/index";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Selectors from "../selectors/selector";
import CompetitionRatingsGrid from "./competition.ratings.grid";
import RecordsRatingsGrid from "./records.ratings.grid";
import UPFRangeGrid from "./upf.range.grid";
import RefereeSettingsGrid from "./referee.settings.grid"

interface StateProps{
    competitionPoints: Models.LookupModels.TablePoint[]
    recordPoints: Models.LookupModels.TablePoint[]
}

interface DispatchProps{
    lookupActions: typeof Actions.LookupActions.ActionCreators,
    rangesActions: typeof Actions.RangesActions.ActionCreators,
    refereeSettingsActions: typeof Actions.RefereeSettingsActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        competitionPoints: Selectors.getCompetitionsTablePoints(state),
        recordPoints: Selectors.getRecordsTablepoints(state)
    }),
    (dispatch): DispatchProps => ({
        lookupActions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch),
        rangesActions: bindActionCreators(Actions.RangesActions.ActionCreators, dispatch),
        refereeSettingsActions: bindActionCreators(Actions.RefereeSettingsActions.ActionCreators, dispatch)
    })
)(class RatingsLayout extends React.Component<StateProps & DispatchProps>{
    componentDidMount(){
        this.props.lookupActions.getCompetitions();
        this.props.lookupActions.getPoints();
        this.props.lookupActions.getRecords();
        this.props.lookupActions.loadCompTypes();
        this.props.rangesActions.loadRanges();
        this.props.refereeSettingsActions.loadRefereeSettings()
    }
    render(){
        return <div>
            <Components.Layout.ContentWrap>
                <Components.TabView>
                    <Components.Tab title="Таблиця нарахування очок рейтингу за місцями" label="byPlace">
                        <CompetitionRatingsGrid points={this.props.competitionPoints} />
                    </Components.Tab>
                    <Components.Tab title="Таблиця нарахування очок рейтингу за встановленими рекордами" label="byRecord">
                        <RecordsRatingsGrid points={this.props.recordPoints} />
                    </Components.Tab>
                    <Components.Tab title="Таблиця ранжування очок рейтингу ФПУ" label="byRange">
                        <UPFRangeGrid />
                    </Components.Tab>
                    <Components.Tab title="Таблиця нарахування очок за вид суддівської діяльності" label="byReferee">
                        <RefereeSettingsGrid />
                    </Components.Tab>
                </Components.TabView>
            </Components.Layout.ContentWrap>
            </div>
    }
})