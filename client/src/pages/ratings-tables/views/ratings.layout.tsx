import * as React from "react";
import * as Layout from "../../../components/layout/index.layout";
import RatingsHeader from "./partials/ratings.header";
import RatingsBody from "./partials/ratings.body"

class RatingsLayout extends React.Component{
    render(){
        return <Layout.ContentWrap>
            <Layout.GridRow>
                <RatingsHeader />
            </Layout.GridRow>
            <Layout.GridRow>
                <RatingsBody />
            </Layout.GridRow>
        </Layout.ContentWrap>
    }
}
export default RatingsLayout;