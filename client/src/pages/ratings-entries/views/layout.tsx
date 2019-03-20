import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Actions from "../actions/index.actions";
import * as Models from "../models/index.models";
import TabView from "../../../components/tab view/tab.view";
import Tab from "../../../components/tab view/tab";
import LayoutHeader from "./partials/layout.header";

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
        return <div className="rating-entry">
            <LayoutHeader/>
            <TabView>
                <Tab title="Записи" label="ratingEntries"></Tab>
                <Tab title="Рейтинги ФПУ" label="fpuRatings"></Tab>
            </TabView>
        </div>
    }
})