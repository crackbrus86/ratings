import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Table from "../../../../components/table/table";
import { ColumnModel, ColumnTypes } from "../../../../components/table/column";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import EntryModal from "../../modals/entry.modal";
import Confirm from "../../../../components/confirm/confirm";

interface StateProps{
    entries: Models.Entry[],
    competitions: Models.Competition[],
    records: Models.Record[],
    deleteEntryId?: number
}

interface DispatchProps{
    actions: typeof Actions.EntriesActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        entries: state.entries.entries,
        competitions: state.lookup.competitions,
        records: state.lookup.records,
        deleteEntryId: state.entries.deleteById
    }),
    (dispatch): DispatchProps => ({
        actions: bindActionCreators(Actions.EntriesActions.ActionCreators, dispatch)
    })
)(class Entries extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.actions.getEntries();
    }

    render(){
        let entries = this.props.entries.map(entry => {
            let events = this.props.competitions.concat(this.props.records);
            let eventName = events.find(event => event.dbName == entry.event).name;
            return {
                ...entry,
                event: eventName
            }            
        });
        return <div className="entries">
            <button className="create-button" onClick={this.props.actions.addEntry}>Створити запис</button>
            <Table items={entries}
                columns={[
                    {
                        title: "",
                        type: ColumnTypes.Button,
                        icon: "edit",
                        width: "20px",
                        onClick: (item: Models.Entry) => this.props.actions.editEntry(item)
                    },
                    {
                        title: "",
                        type: ColumnTypes.Button,
                        icon: "trash-alt",
                        width: "20px",
                        onClick: (item: Models.Entry) => this.props.actions.selectToRemove(item.ratingEntryId)
                    },
                    {
                        title: "П.І.П",
                        field: "fullname",
                        width: "300px",
                        sortable: true
                    },
                    {
                        title: "Подія",
                        field: "event",
                        width: "350px",
                        sortable: true
                    },
                    {
                        title: "Місце",
                        field: "place",
                        width: "80px",
                        sortable: true
                    },
                    {
                        title: "Дата",
                        type: ColumnTypes.Date,
                        field: "eventDate",
                        width: "100px",
                        sortable: true
                    },
                    {
                        title: "",
                        width: "*"
                    }
                ] as ColumnModel[]}
            />
            <EntryModal/>
            <Confirm 
                title="Підтвердіть видалення" 
                text="Ви впевнені що хочете видалити цей запис?" 
                show={!!this.props.deleteEntryId}
                onClose={() => this.props.actions.cancelRemove()}
                onConfirm={() => this.props.actions.deleteEntry()}
            />  
        </div>
    }
})