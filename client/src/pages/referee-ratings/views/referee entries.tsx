import * as React from "react";
import {connect} from "react-redux";
import * as Models from "../models/index.models";
import * as Actions from "../actions/index.actions"
import RefereeEntryModal from "../modals/referee.entry.modal"
import {SelectOption} from "../../../components/form/select"
import * as Selectors from "../selectors/index.selectors"

interface StateProps{
    entries: Models.RefereeEntry[],
    selectedEntry?: Models.RefereeEntry,
    activities?: SelectOption<Models.Activity>[],
    events?: SelectOption<Models.Event>[]
}

interface DispatchProps{
    addEntry?: () => void
    closeEntry?: () => void
    saveEntry?: (entry: Models.RefereeEntry) => void
}

const mapStateToProps = (state: Models.StoreState): StateProps => ({
    entries: state.refereeEntries.entries,
    selectedEntry: state.refereeEntries.selectedEntry,
    activities: Selectors.Lookup.activitiesList(state),
    events: Selectors.Lookup.eventsList(state)
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
    addEntry: () => dispatch(Actions.RefereeEntryActions.ActionCreators.addRefereeEntry()),
    closeEntry: () => dispatch(Actions.RefereeEntryActions.ActionCreators.closeRefereeEntry()),
    saveEntry: (entry) => dispatch(Actions.RefereeEntryActions.ActionCreators.saveRefereeEntry(entry, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(
    function EntriesTable(props: StateProps & DispatchProps){
        return <div className="entries">
            <button className="create-button" onClick={props.addEntry}>Створити запис</button>
            {
                !!props.entries.length &&
                <ul>
                    {
                        props.entries.map((x, index) => <li key={index}>{x.fullname}</li>)
                    }
                </ul>
            }
            <RefereeEntryModal 
                entry={props.selectedEntry} 
                onClose={props.closeEntry} 
                activities={props.activities}
                events={props.events}
                onSave={props.saveEntry}
            />
        </div>
    }
)