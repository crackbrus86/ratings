import * as React from "react";
import {connect} from "react-redux";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions"
import RefereeEntryModal from "../modals/referee.entry.modal"
import {SelectOption} from "../../../components/form/select"
import * as Components from "../../../components/index"
import {ColumnModel} from "../../../components/index"
import * as Selectors from "../selectors/index.selectors"

interface StateProps{
    entries: Models.ExtendedEntry[],
    selectedEntry?: Models.RefereeEntry,
    activities?: SelectOption<Models.Activity>[],
    events?: SelectOption<Models.Event>[],
    names?: string[]
    deleteById?: number
}

interface DispatchProps{
    addEntry?: () => void
    closeEntry?: () => void
    saveEntry?: (entry: Models.RefereeEntry) => void
    editEntry?: (entry: Models.RefereeEntry) => void
    selectToRemove?: (id: number) => void
    cancelRemove?: () => void
    removeEntry?: () => void
}

const mapStateToProps = (state: Models.StoreState): StateProps => ({
    entries: Selectors.RefereeEntry.getTableEntries(state),
    selectedEntry: state.refereeEntries.selectedEntry,
    activities: Selectors.Lookup.activitiesList(state),
    events: Selectors.Lookup.eventsList(state),
    names: state.lookup.names,
    deleteById: state.refereeEntries.deleteById
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    addEntry: () => dispatch(Actions.RefereeEntryActions.ActionCreators.addRefereeEntry()),
    closeEntry: () => dispatch(Actions.RefereeEntryActions.ActionCreators.closeRefereeEntry()),
    saveEntry: (entry) => dispatch(Actions.RefereeEntryActions.ActionCreators.saveRefereeEntry(entry, true)),
    editEntry: (entry) => dispatch(Actions.RefereeEntryActions.ActionCreators.editRefereeEntry(entry)),
    selectToRemove: (id) => dispatch(Actions.RefereeEntryActions.ActionCreators.selectToRemove(id)),
    cancelRemove: () => dispatch(Actions.RefereeEntryActions.ActionCreators.cancelRemove()),
    removeEntry: () => dispatch(Actions.RefereeEntryActions.ActionCreators.removeEntry())
})

export default connect(mapStateToProps, mapDispatchToProps)(
    function EntriesTable(props: StateProps & DispatchProps){
        return <div className="entries">
            <button className="create-button" onClick={props.addEntry}>Створити запис</button>
            {
                !!props.entries.length &&
                <>
                <Components.Table items={props.entries} columns={[
                    {
                        title: "",
                        type: Components.ColumnTypes.Button,
                        icon: "edit",
                        width: "20px",
                        onClick: (entry: Models.RefereeEntry) => props.editEntry(entry)
                    },
                    {
                        title: "",
                        type: Components.ColumnTypes.Button,
                        icon: "trash-alt",
                        width: "20px",
                        onClick: (entry: Models.RefereeEntry) => props.selectToRemove(entry.id)
                    },
                    {
                        title: "П.І.П",
                        field: "fullname",
                        width: "200px",
                        sortable: true
                    },
                    {
                        title: "Подія",
                        field: "eventName",
                        width: "250px",
                        sortable: true
                    },
                    {
                        title: "Вид діяльності",
                        field: "activityName",
                        width: "200px",
                        sortable: true
                    },
                    {
                        title: "Дата",
                        field: "eventDate",
                        type: Components.ColumnTypes.Date,
                        width: "80px",
                        sortable: true
                    },
                    {
                        title: "",
                        width: "*"
                    }
                    ] as ColumnModel[]} />
                </>
            }
            <RefereeEntryModal 
                entry={props.selectedEntry} 
                onClose={props.closeEntry} 
                activities={props.activities}
                names={props.names}
                events={props.events}
                onSave={props.saveEntry}
            />
            <Components.Confirm 
                title="Підтвердіть видалення" 
                text="Ви впевнені що хочете видалити цей запис?" 
                show={!!props.deleteById}
                onClose={props.cancelRemove}
                onConfirm={props.removeEntry} />
        </div>
    }
)