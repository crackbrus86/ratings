import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Selectors from "../selectors/index.selector";
import Modal from "../../../components/modal/modal";
import Form from "../../../components/form/form";
import {SelectOption} from "../../../components/form/select"

interface StateProps{
    entry: Models.Entry,
    events: SelectOption[],
    validation: Selectors.EntrySelector.EntryValidationResult
}

interface DispatchProps{
    actions: typeof Actions.EntriesActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        entry: state.entries.currentEntry,
        events: Selectors.EntrySelector.eventList(state),
        validation: Selectors.EntrySelector.validation(state)
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.EntriesActions.ActionCreators, dispatch)
    })
)(class EntryModal extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props)
    }

    getPlaces = () => {
        let placeOptions = [];
        for(let i = 0; i < 4; i++){
            placeOptions.push({text: !i ? '' : i.toString(), value: !i ? null : i} as SelectOption)
        }
        return placeOptions;
    }

    render(){
        return this.props.entry && <Modal>
            <Modal.Header title={`${this.props.entry.ratingEntryId ? 'Редагувати' : 'Створити'} Запис`} onClose={this.props.actions.closeEntry} />
            <Modal.Body><div style={{width: '395px'}}>
                <Form>
                    <Form.TextInput 
                        label="Прізвище, Ім'я спортсмена" 
                        value={this.props.entry.fullname} 
                        validation={this.props.validation.isFullNameValid}
                        onChange={(value) => this.props.actions.updateEntry("fullname", value)} 
                    />
                    <Form.RadioButton 
                        label="Тип запису"
                        value={this.props.entry.type}
                        name="RecordType" 
                        buttons={[{label: "Призове місце", value: Models.EntryType.Place}, {label: "Рекорд", value: Models.EntryType.Record}]}
                        onChange={(value) => this.props.actions.updateEntry("type", value)}
                    />
                    <Form.Select
                        label={this.props.entry.type == Models.EntryType.Place ? "Змагання" : "Рекорд"}
                        options={this.props.events}
                        validation={this.props.validation.isEventValid}
                        value={this.props.entry.event}
                        onChange={(value) => this.props.actions.updateEntry("event", value)}
                    />
                    {
                        this.props.entry.type == Models.EntryType.Place &&
                        <Form.Select
                            label="Місце"
                            options={this.getPlaces()}
                            validation={this.props.validation.isPlaceValid}
                            value={this.props.entry.place}
                            onChange={(value) => this.props.actions.updateEntry("place", value)}
                        />
                    }
                    <Form.DatePicker
                        label="Дата"
                        value={this.props.entry.eventDate}
                        validation={this.props.validation.isEventDateValid}
                        onChange={(value) => this.props.actions.updateEntry("eventDate", value)}
                    />
                </Form>
            </div></Modal.Body>
            <Modal.Footer>
                <Modal.FooterButton label="Зберегти" icon="save" disabled={!this.props.validation.isValid} onClick={() => null} />
            </Modal.Footer>
        </Modal>
    }
})
