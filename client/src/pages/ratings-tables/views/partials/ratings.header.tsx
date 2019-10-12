import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../../models/index.models";
import * as Selectors from "../../selectors/index.selectors";
import * as Actions from "../../actions/index.actions";
import Form from "../../../../components/form/form";
import * as Layout from "../../../../components/layout/index.layout";

interface StateProps{
    ratings: Models.SelectOption[],
    rating: string,
    ratingTitle?: string
}

interface DispatchProps{
    lookupActions: typeof Actions.LookupActions.ActionCreators,
    shellActions: typeof Actions.ShellActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState):StateProps => ({
        ratings: Selectors.LookupSelectors.ratingsList(state),
        rating: state.shell.rating,
        ratingTitle: Selectors.ShellSelectors.ratingTitle(state)
    }),
    (dispatch): DispatchProps => ({
        lookupActions: bindActionCreators(Actions.LookupActions.ActionCreators, dispatch),
        shellActions: bindActionCreators(Actions.ShellActions.ActionCreators, dispatch)
    })
)(class RatingsHeader extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.lookupActions.loadRatings();
    }

    render(){
        return <>
            <Form>
                <Layout.GridRow>
                    <Form.Select 
                        label="Оберіть рейтинг"
                        options={this.props.ratings} 
                        value={this.props.rating}
                        onChange={(value) => this.props.shellActions.changeRating(value)}
                        classNames="upf-ratings-filter"
                    />
                </Layout.GridRow>
                <Layout.GridRow>
                    {
                        this.props.ratingTitle &&
                        <h3>{this.props.ratingTitle}</h3>
                    }
                </Layout.GridRow>
            </Form>
        </>
    }
});