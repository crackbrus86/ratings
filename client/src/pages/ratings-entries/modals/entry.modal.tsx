import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import Modal from "../../../components/modal/modal";
import ModalHeader from "../../../components/modal/modal.header";

interface StateProps{
    entry: Models.Entry
}

interface DispatchProps{
    actions: typeof Actions.EntriesActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        entry: state.entries.currentEntry
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.EntriesActions.ActionCreators, dispatch)
    })
)(class EntryModal extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props)
    }

    render(){
        return this.props.entry && <Modal>
            <ModalHeader title={`${this.props.entry.ratingEntryId ? 'Редагувати' : 'Створити'} Запис`} onClose={this.props.actions.closeEntry} />
        </Modal>
    }
})
