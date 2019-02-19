import * as React from "react";
import { ColumnModel } from "./column";
import Cell from "./cell";

export interface RowProps{
    item: any,
    key?: number,
    columns: ColumnModel[]
}

class Row extends React.PureComponent<RowProps>{
    render(){
        return <tr key={this.props.key}>
            {
                this.props.columns.map((column, index) => <Cell key={index} item={this.props.item} column={column} />)
            }
        </tr>
    }
}
export default Row;