import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/index.actions";
import * as Models from "../models/index.models";
import TabView from "../../../components/tab view/tab.view";
import Tab from "../../../components/tab view/tab";
import LayoutHeader from "./partials/layout.header";
import Entries from "./partials/entries";
import MinistryRatings from "./partials/ministry ratings";
import UPFRatings from "./partials/upf ratings";
import {ContentWrap} from "../../../components/layout/index.layout";

interface StateProps{

}

interface DispatchProps{
    
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({

    }),
    (dispatch): DispatchProps => ({

    })
)(class Layout extends React.Component<StateProps & DispatchProps>{
    render(){
        return <ContentWrap>
                <LayoutHeader/>
                <TabView>
                    <Tab title="Записи" label="ratingEntries">
                        <Entries/>
                    </Tab>
                    <Tab title="Міністерський Рейтинг (Чоловіки)" label="ministryRatingMale">
                        <MinistryRatings ratingFilter="Male" />
                    </Tab>
                    <Tab title="Міністерський Рейтинг (Жінки)" label="ministryRatingFemale">
                        <MinistryRatings ratingFilter="Female" />
                    </Tab>
                    <Tab title="Рейтинг ФПУ (Чоловіки)" label="upfRatingMale">
                        <UPFRatings ratingFilter="Male" />
                    </Tab>                    
                    <Tab title="Рейтинг ФПУ (Жінки)" label="upfRatingFemale">
                        <UPFRatings ratingFilter="Female" />
                    </Tab>
                </TabView>
            </ContentWrap>
    }
})