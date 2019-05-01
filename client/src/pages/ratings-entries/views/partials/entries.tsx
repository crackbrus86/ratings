import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Table from "../../../../components/table/table";
import { ColumnModel, ColumnTypes } from "../../../../components/table/column";
import * as Models from "../../models/index.models";
import * as Actions from "../../actions/index.actions";
import * as Selectors from "../../selectors/index.selector";
import EntryModal from "../../modals/entry.modal";
import Confirm from "../../../../components/confirm/confirm";
import Search from "../../../../components/search/search";

interface StateProps{
    entries: Models.Entry[],
    competitions: Models.Competition[],
    records: Models.Record[],
    deleteEntryId?: number,
    compTypes: Models.CompetitionType[],
    saerchValue?: string
}

interface DispatchProps{
    entryActions: typeof Actions.EntriesActions.ActionCreators,
    shellActions: typeof Actions.ShellActions.ActionCreators
}

export default connect<StateProps, DispatchProps>(
    (state: Models.StoreState): StateProps => ({
        entries: Selectors.EntrySelector.entriesList(state),
        competitions: state.lookup.competitions,
        records: state.lookup.records,
        deleteEntryId: state.entries.deleteById,
        compTypes: state.lookup.compTypes,
        saerchValue: state.shell.searchValue
    }),
    (dispatch): DispatchProps => ({
        entryActions: bindActionCreators(Actions.EntriesActions.ActionCreators, dispatch),
        shellActions: bindActionCreators(Actions.ShellActions.ActionCreators, dispatch)
    })
)(class Entries extends React.Component<StateProps & DispatchProps>{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.entryActions.getEntries();
    }

    render(){
        return <div className="entries">
            <button className="create-button" onClick={this.props.entryActions.addEntry}>Створити запис</button>
            <Search searchValue={this.props.saerchValue} onChange={this.props.shellActions.changeSearchValue} />
            <Table items={this.props.entries}
                columns={[
                    {
                        title: "",
                        type: ColumnTypes.Button,
                        icon: "edit",
                        width: "20px",
                        onClick: (item: Models.Entry) => this.props.entryActions.editEntry(item)
                    },
                    {
                        title: "",
                        type: ColumnTypes.Button,
                        icon: "trash-alt",
                        width: "20px",
                        onClick: (item: Models.Entry) => this.props.entryActions.selectToRemove(item.ratingEntryId)
                    },
                    {
                        title: "П.І.П",
                        field: "fullname",
                        width: "200px",
                        sortable: true
                    },
                    {
                        title: "Подія",
                        field: "event",
                        width: "250px",
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
                        title: "Показник по ф-лі Вілкса",
                        field: "wilks",
                        width: "100px",
                        sortable: true
                    },
                    {
                        title: "Тренер",
                        field: "coach",
                        width: "200px",
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
                onClose={() => this.props.entryActions.cancelRemove()}
                onConfirm={() => this.props.entryActions.deleteEntry()}
            />  
        </div>
    }
})