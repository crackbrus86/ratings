import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Table from "../../../../components/table/table";
import { ColumnModel, ColumnTypes } from "../../../../components/table/column";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import EntryModal from "../../modals/entry.modal";

interface StateProps{
    entries: Models.Entry[],
    competitions: Models.Competition[],
    records: Models.Record[]
}

interface DispatchProps{
    actions: typeof Actions.EntriesActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        entries: state.entries.entries,
        competitions: state.lookup.competitions,
        records: state.lookup.records
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
                        onClick: (item: Models.Entry) => this.props.actions.editEntry(item)
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
                    }
                ] as ColumnModel[]}
            />
            <EntryModal/>
        </div>
    }
})