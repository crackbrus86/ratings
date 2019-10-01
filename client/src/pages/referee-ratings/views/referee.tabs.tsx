import * as React from "react";
import {connect} from "react-redux"
import * as Components from "../../../components/index";
import RefereeHeader from "./referee.header";
import EntriesTable from "./referee entries";
import * as Models from "../models/index.models"
import * as Actions from "../actions/index.actions"
import RefereeRatings from "./referee.ratings"

interface DispatchProps{
    loadLookups: () => void
}

const mapDispatchProps = (dispatch): DispatchProps => ({
    loadLookups: () => dispatch(Actions.Lookup.loadLookups())
})

export default connect<any, DispatchProps>(null, mapDispatchProps)(
    function RefereeTabs(props: DispatchProps){
        React.useEffect(() => {
            props.loadLookups()
        }, [])

        return <Components.Layout.ContentWrap>
            <RefereeHeader />
            <Components.TabView>
                <Components.Tab title="Записи" label="refereeEntries">
                    <EntriesTable />
                </Components.Tab>
                <Components.Tab title="Рейтинги суддів" label="refereeRatings">
                    <RefereeRatings/>
                </Components.Tab>
            </Components.TabView>
        </Components.Layout.ContentWrap>
    }
)