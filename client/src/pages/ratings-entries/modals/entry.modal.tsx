import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions";
import * as Selectors from "../selectors/index.selector";
import Modal from "../../../components/modal/modal";
import Form from "../../../components/form/form";
import {SelectOption} from "../../../components/form/select"
import * as Layout from "../../../components/layout/index.layout";

interface StateProps{
    entry: Models.Entry,
    events: SelectOption[],
    validation: Selectors.EntrySelector.EntryValidationResult,
    names: string[],
    divisions: SelectOption[],
    compTypes: SelectOption[],
    regions: SelectOption[],
    coaches: string[],
    fstList: string[],
    schools: string[]
}

interface DispatchProps{
    actions: typeof Actions.EntriesActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        entry: state.entries.currentEntry,
        events: Selectors.EntrySelector.eventList(state),
        validation: Selectors.EntrySelector.validation(state),
        names: state.lookup.names,
        divisions: Selectors.EntrySelector.divisionList(state),
        compTypes: Selectors.EntrySelector.compTypesList(state),
        regions: Selectors.LookupSelector.regionsList(state),
        coaches: state.lookup.coaches,
        fstList: state.lookup.fstList,
        schools: state.lookup.schools
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
        for(let i = 0; i < 9; i++){
            placeOptions.push({text: !i ? '' : i.toString(), value: !i ? null : i} as SelectOption)
        }
        return placeOptions;
    }

    onSave = () => {
        this.props.actions.saveEntry();
    }

    render(){
        var wilks = !!this.props.entry && this.props.entry.wilks ? this.props.entry.wilks.toString() : '';
        return this.props.entry && <Modal>
            <Modal.Header title={`${this.props.entry.ratingEntryId ? 'Редагувати' : 'Створити'} Запис`} onClose={this.props.actions.closeEntry} />
            <Modal.Body>
                <div style={{width: '946px'}}>
                    <Layout.GridRow>
                        <Layout.GridColumn>
                            <Form>
                                <Form.TextInput 
                                    label="Прізвище, Ім'я спортсмена" 
                                    value={this.props.entry.fullname} 
                                    validation={this.props.validation.isFullNameValid}
                                    autocomplete={true}
                                    autocompleteItems={this.props.names}
                                    onChange={(value) => this.props.actions.updateEntry("fullname", value)} 
                                />
                                <Form.Select
                                    label="Стать"
                                    options={[{text: "", value: null}, {text: "Чоловіки", value: "M"}, {text: "Жінки", value: "F"}]}
                                    value={this.props.entry.gender}
                                    validation={this.props.validation.isGenderValid}
                                    onChange={(value) => this.props.actions.updateEntry("gender", value)}
                                />
                                <Form.Select 
                                    label="Дивізіон"
                                    options={this.props.divisions}
                                    value={this.props.entry.division}
                                    validation={this.props.validation.isDivisionValid}
                                    onChange={(value) => this.props.actions.updateEntry("division", value)}
                                />
                                <Form.Select 
                                    label="Область"
                                    options={this.props.regions}
                                    value={this.props.entry.region}
                                    validation={this.props.validation.isRegionValid}
                                    onChange={(value) => this.props.actions.updateEntry("region", value)}
                                />
                                <Form.TextInput 
                                    label="Тренер"
                                    value={this.props.entry.coach}
                                    autocomplete={true}
                                    autocompleteItems={this.props.coaches}
                                    onChange={(value) => this.props.actions.updateEntry("coach", value)}
                                />
                                <Form.TextInput 
                                    label="ФСТ"
                                    value={this.props.entry.fst}
                                    autocomplete={true}
                                    autocompleteItems={this.props.fstList}
                                    onChange={(value) => this.props.actions.updateEntry("fst", value)}
                                />
                                <Form.TextInput 
                                    label="ДЮСШ"
                                    value={this.props.entry.school}
                                    autocomplete={true}
                                    autocompleteItems={this.props.schools}
                                    onChange={(value) => this.props.actions.updateEntry("school", value)}
                                />
                            </Form>
                        </Layout.GridColumn>
                        <Layout.GridColumn>
                            <Form>
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
                                <Form.Select 
                                    label="Дисципліна"
                                    options={this.props.compTypes}
                                    value={this.props.entry.compType}
                                    validation={this.props.validation.isComTypeValid}
                                    onChange={(value) => this.props.actions.updateEntry("compType", value)}
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
                                <Form.TextInput
                                    label="Показник за формулою Вілкса"
                                    value={wilks}
                                    onChange={(value) => this.props.actions.updateEntry("wilks", value)}
                                />
                            </Form>
                        </Layout.GridColumn>                        
                    </Layout.GridRow>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Modal.FooterButton label="Зберегти" icon="save" disabled={!this.props.validation.isValid} onClick={this.onSave} />
            </Modal.Footer>
        </Modal>
    }
})
