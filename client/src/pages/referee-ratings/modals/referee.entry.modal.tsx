import * as React from "react"
import * as Models from "../models/index.models"
import * as Components from "../../../components/index";
import Modal from "../../../components/modal/modal";
import Form from "../../../components/form/form";
import {SelectOption} from "../../../components/form/select"

export interface OwnProps{
    entry?: Models.RefereeEntry,
    activities?: SelectOption<Models.Activity>[],
    events?: SelectOption<Models.Event>[],
    names?: string[],
    onClose?: () => void,
    onSave?: (entry: Models.RefereeEntry) => void
}

type ActionType = {
    type: 'set' | 'update',
    payload?: any
}

const initialState: Models.RefereeEntry = {
    id: null,
    fullname: null,
    activity: null,
    event: null,
    eventDate: null
}

const reducer = (state: Models.RefereeEntry, action: ActionType) => {
    switch(action.type){
        case "set": {
            let payload = action.payload
            return { ...payload }
        }
        case "update":{
            let payload = action.payload
            return {
                ...state,
                [payload.key]: payload.value
            }
        }
        default:
            return state
    }
}

export const RefereeEntryModal: React.FunctionComponent<OwnProps> = (props) => {
    const [state, dispatch] = React.useReducer<React.Reducer<Models.RefereeEntry, any>>(reducer, initialState)

    React.useEffect(() => {
        if(!!props.entry) dispatch({type: "set", payload: props.entry})
        return () => dispatch({type: "set", initialState})
    }
    ,[props.entry])

    const onUpdate = (key: keyof Models.RefereeEntry, value: any) => {
        dispatch({type: "update", payload: {key: key, value: value}})
    }

    const validation = () => {
        let result: RefereeEntryValidation = {
            isValid: true,
            isFullNameValid: {isValid: true, message: null},
            isEventDateValid: {isValid: true, message: null},
            isActivityValid: {isValid: true, message: null},
            isEventValid: {isValid: true, message: null}
        }
        if(!state.fullname)
            result.isFullNameValid = {isValid: false, message: "Прізвище, Ім'я, По-батькові є обов'язковим полем!"}
        if(!state.event)
            result.isEventValid = {isValid: false, message: "Не вибрано змагання!"}
        if(!state.activity)
            result.isActivityValid = {isValid: false, message: "Не вибрано вид діяльності!"}
        if(!state.eventDate || isNaN(state.eventDate.getTime()))
            result.isEventDateValid = {isValid: false, message: "He вибрано дату проведення!"}
        if(!result.isFullNameValid.isValid || !result.isEventValid.isValid || !result.isActivityValid.isValid || !result.isEventDateValid.isValid)
            result.isValid = false
        return result
    }

    return  props.entry && <Modal width="400px">
        <Modal.Header title={`${state.id ? 'Редагувати' : 'Створити'} Запис`} onClose={props.onClose} />
        <Modal.Body>
            <Form>
                <Form.TextInput 
                    label="Прізвище, Ім'я, По-батькові" 
                    value={state.fullname} 
                    autocomplete={true}
                    autocompleteItems={props.names}
                    validation={validation().isFullNameValid}
                    onChange={(v) => onUpdate("fullname", v)} />
                <Form.Select 
                    label="Змагання" 
                    options={props.events} 
                    value={state.event} 
                    validation={validation().isEventValid}
                    onChange={(v) => onUpdate("event", v)} />
                <Form.Select 
                    label="Вид діяльності" 
                    options={props.activities} 
                    value={state.activity} 
                    validation={validation().isActivityValid}
                    onChange={(v) => onUpdate("activity", v)} />
                <Form.DatePicker 
                    label="Дата проведення" 
                    value={state.eventDate} 
                    validation={validation().isEventDateValid}
                    onChange={(v) => onUpdate("eventDate", v)} />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Modal.FooterButton label="Зберегти" icon="save" disabled={!validation().isValid} onClick={() => props.onSave(state)} />
        </Modal.Footer>
    </Modal>
}

export default RefereeEntryModal

interface RefereeEntryValidation{
    isValid: boolean,
    isFullNameValid: Models.ValidationResult,
    isEventValid: Models.ValidationResult,
    isActivityValid: Models.ValidationResult,
    isEventDateValid: Models.ValidationResult
}