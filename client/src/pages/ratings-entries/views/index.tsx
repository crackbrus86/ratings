import * as React from "react";
import TabView from "../../../components/tab view/tab.view";
import Tab from "../../../components/tab view/tab";

export default class RatingEntriesIndex extends React.Component<any, any>{
    render(){
        return <>
            <TabView>
                <Tab title="Записи рейтингів" label="ratingEntries"><div>123</div></Tab>
                <Tab title="Рейтинги ФПУ" label="fpuRatings"><div>234</div></Tab>
            </TabView>
        </>
    }
}