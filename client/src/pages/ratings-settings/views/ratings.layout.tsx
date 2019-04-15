import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {GridRow, GridColumn, ContentWrap} from "../../../components/layout/index.layout";
import TabView from "../../../components/tab view/tab.view";
import Tab from "../../../components/tab view/tab";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Selectors from "../selectors/selector";
import CompetitionRatingsGrid from "./competition.ratings.grid";
import RecordsRatingsGrid from "./records.ratings.grid";

interface StateProps{
    competitionPoints: Models.LookupModels.TablePoint[]
    recordPoints: Models.LookupModels.TablePoint[]
}

interface DispatchProps{
    actions: typeof Actions.LookupActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        competitionPoints: Selectors.getCompetitionsTablePoints(state),
        recordPoints: Selectors.getRecordsTablepoints(state)
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch)
    })
)(class RatingsLayout extends React.Component<StateProps & DispatchProps>{
    componentDidMount(){
        this.props.actions.getCompetitions();
        this.props.actions.getPoints();
        this.props.actions.getRecords();
    }
    render(){
        return <div>
            <ContentWrap>
                <TabView>
                    <Tab title="Таблиця нарахування очок рейтингу за місцями" label="byPlace">
                        <CompetitionRatingsGrid points={this.props.competitionPoints} />
                    </Tab>
                    <Tab title="Таблиця нарахування очок рейтингу за встановленими рекордами" label="byRecord">
                        <RecordsRatingsGrid points={this.props.recordPoints} />
                    </Tab>
                </TabView>
            </ContentWrap>
            </div>
    }
})