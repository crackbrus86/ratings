import * as React from "react";
import * as Components from "../../../components/index";
import RefereeHeader from "./referee.header";
import EntriesTable from "./referee entries";

export default function RefereeTabs(){
    return <Components.Layout.ContentWrap>
        <RefereeHeader />
        <Components.TabView>
            <Components.Tab title="Записи" label="refereeEntries">
                <EntriesTable />
            </Components.Tab>
            <Components.Tab title="Рейтинги суддів" label="refereeRatings">

            </Components.Tab>
        </Components.TabView>
    </Components.Layout.ContentWrap>
}