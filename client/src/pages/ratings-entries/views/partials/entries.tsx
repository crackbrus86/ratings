import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import EntryModal from "../../modals/entry.modal";

interface StateProps{

}

interface DispatchProps{
    actions: typeof Actions.EntriesActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({

    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.EntriesActions.ActionCreators, dispatch)
    })
)(class Entries extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props)
    }

    render(){
        return <div className="entries">
            <button onClick={this.props.actions.addEntry}>Створити запис</button>
            <EntryModal/>
        </div>
    }
})