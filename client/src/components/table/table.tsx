import * as React from "react";
import Column, { ColumnModel } from "./column";
import Row from "./row";

export interface TableProps {
    items: any[],
    columns: ColumnModel[]
}

interface TableState{
    sortField: string,
    sortAsc: boolean;
}

class Table extends React.PureComponent<TableProps, TableState>{
    constructor(props) {
        super(props);
        this.state = {
            sortField: null,
            sortAsc: true
        }
    }

    componentDidMount(){
        this.setFirstSorting();
    }

    setFirstSorting = () => {
        let sortableColumns = this.props.columns.filter(column => column.sortable);
        if(sortableColumns.length){
            this.setState({sortField: sortableColumns[0].field});
        }
    }

    sortingMethod = (itemA, itemB) => {
        let field = this.state.sortField;
        var collator = new Intl.Collator();

        if(!(itemA[field] instanceof String && itemA[field].indexOf('-') > -1) && !(itemB[field] instanceof String && itemA[field].indexOf('-') > -1) && !isNaN(parseFloat(itemA[field])) && !isNaN(parseFloat(itemB[field])))
            return this.state.sortAsc ? itemA[field] - itemB[field] : itemB[field] - itemA[field];
        else
            return this.state.sortAsc ? collator.compare(itemA[field], itemB[field]) : collator.compare(itemB[field], itemA[field]);
    }

    onChangeSorting = (field: string, asc: boolean) => {
        this.setState({sortField: field, sortAsc: asc});
    }

    render() {
        let items = !this.state.sortField ? this.props.items : this.props.items.sort((a,b) => this.sortingMethod(a,b));
        return <table className="rat-table">
            <thead>
                <tr>
                {
                    this.props.columns.length && 
                    this.props.columns.map((column, index) => 
                    <Column 
                    key={index} 
                    index={index} 
                    column={column} 
                    sortAsc={this.state.sortAsc} 
                    onSort={this.onChangeSorting} 
                    sortField={this.state.sortField}
                    />)
                }
                </tr>
            </thead>
            <tbody>
                {
                    items.map((item, index) => <Row  key={index} index={index} item={item} columns={this.props.columns} />)
                }
            </tbody>
        </table>
    }
}
export default Table;