import * as React from "react";
import Column, { ColumnModel } from "./column";
import Row from "./row";

export interface TableProps {
    items: any[],
    columns: ColumnModel[]
}

class Table extends React.PureComponent<TableProps>{
    constructor(props) {
        super(props);
    }

    render() {
        return <table className="rat-table">
            <thead>
                <tr>
                {
                    this.props.columns.length && 
                    this.props.columns.map((column, index) => <Column key={index} index={index} column={column} />)
                }
                </tr>
            </thead>
            <tbody>
                {
                    this.props.items.map((item, index) => <Row  key={index} index={index} item={item} columns={this.props.columns} />)
                }
            </tbody>
        </table>
    }
}
export default Table;