import * as React from "react";
import { ColumnModel, ColumnTypes } from "./column";

export interface CellProps{
    index?: number,
    item: any,
    column: ColumnModel
}

class Cell extends React.PureComponent<CellProps>{
    renderItem = () => {
        switch(this.props.column.type){
            case ColumnTypes.Button:
            case ColumnTypes.Input:
            default:
                return this.props.item[this.props.column.field];
        }
    }
    render(){
        return <td key={this.props.index}>
        {
            this.renderItem()
        }
        </td>
    }
}
export default Cell;