import * as React from "react";
import { ColumnModel } from "./column";
import Cell from "./cell";

export interface RowProps{
    item: any,
    index?: number,
    columns: ColumnModel[]
}

class Row extends React.PureComponent<RowProps>{
    render(){
        return <tr key={this.props.index}>
            {
                this.props.columns.map((column, index) => <Cell key={index} index={this.props.index} item={this.props.item} column={column} onChange={column.onChange} />)
            }
        </tr>
    }
}
export default Row;