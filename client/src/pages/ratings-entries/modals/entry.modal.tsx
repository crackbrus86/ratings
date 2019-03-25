import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import Modal from "../../../components/modal/modal";
import Form from "../../../components/form/form";

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
            <Modal.Header title={`${this.props.entry.ratingEntryId ? 'Редагувати' : 'Створити'} Запис`} onClose={this.props.actions.closeEntry} />
            <Modal.Body><div style={{width: '500px', height: '300px'}}>
                <Form>
                    <Form.TextInput 
                        label="Прізвище, Ім'я спортсмена" 
                        value={this.props.entry.fullname} 
                        onChange={(value) => this.props.actions.updateEntry("fullname", value)} 
                    />

                    <Form.RadioButton 
                        label="Тип запису"
                        value={this.props.entry.type}
                        name="RecordType" 
                        buttons={[{label: "Призове місце", value: Models.EntryType.Place}, {label: "Рекорд", value: Models.EntryType.Record}]}
                        onChange={(value) => this.props.actions.updateEntry("type", value)}
                    />
                </Form>
            </div></Modal.Body>
            <Modal.Footer>
                <Modal.FooterButton label="Зберегти" icon="save" onClick={() => null} />
            </Modal.Footer>
        </Modal>
    }
})
