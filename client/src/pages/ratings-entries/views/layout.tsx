import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/index.actions";
import * as Models from "../models/index.models";
import * as Components from "../../../components/index";
import LayoutHeader from "./partials/layout.header";
import Entries from "./partials/entries";
import MinistryRatings from "./partials/ministry ratings";
import UPFRatings from "./partials/upf ratings";
import MinistryCoachRatings from "./partials/ministry coach ratings";
import UPFCoachRatings from "./partials/upf coach ratings";
import MinistryRegionRatings from "./partials/ministry region ratings";
import MinistryFstRatings from "./partials/ministry fst ratings";
import MinistrySchoolRatings from "./partials/ministry school ratings";

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
        return <Components.Layout.ContentWrap>
                <LayoutHeader/>
                <Components.TabView>
                    <Components.Tab title="Записи" label="ratingEntries">
                        <Entries/>
                    </Components.Tab>
                    <Components.Tab title="Міністерський Рейтинг (Чоловіки)" label="ministryRatingMale">
                        <MinistryRatings ratingFilter="Male" />
                    </Components.Tab>
                    <Components.Tab title="Міністерський Рейтинг (Жінки)" label="ministryRatingFemale">
                        <MinistryRatings ratingFilter="Female" />
                    </Components.Tab>
                    <Components.Tab title="Рейтинг ФПУ (Чоловіки)" label="upfRatingMale">
                        <UPFRatings ratingFilter="Male" />
                    </Components.Tab>                    
                    <Components.Tab title="Рейтинг ФПУ (Жінки)" label="upfRatingFemale">
                        <UPFRatings ratingFilter="Female" />
                    </Components.Tab>
                    <Components.Tab title="Міністерський Рейтинг (Тренери)" label="ministryCoachRating">
                        <MinistryCoachRatings />
                    </Components.Tab>
                    <Components.Tab title="Рейтинг ФПУ (Тренери)" label="upfCoachRating">
                        <UPFCoachRatings />
                    </Components.Tab>
                    <Components.Tab title="Міністерський рейтинг (Області)" label="ministryRegionRatings">
                        <MinistryRegionRatings />
                    </Components.Tab>
                    <Components.Tab title="Міністерський рейтинг (ФСТ)" label="ministryFstRatings">
                        <MinistryFstRatings />
                    </Components.Tab>
                    <Components.Tab title="Міністерський рейтинг (ДЮСШ)" label="ministrySchoolRatings">
                        <MinistrySchoolRatings />
                    </Components.Tab>
                </Components.TabView>
            </Components.Layout.ContentWrap>
    }
})