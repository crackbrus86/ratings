import * as React from "react";
import { ColumnModel, ColumnTypes } from "./column";
import EditableCell from "./editable.cell";
import TableButton from "./table.button";
import * as moment from "moment";

export interface CellProps{
    index?: number,
    item: any,
    column: ColumnModel,
    onChange?: (item: any) => void
}

class Cell extends React.PureComponent<CellProps>{

    onItemChange = (value: string, item: any, column: any) => {
        item[column] = value;
        this.props.onChange(item);
    }

    renderItem = () => {
        switch(this.props.column.type){
            case ColumnTypes.Button:
                return <TableButton icon={this.props.column.icon} onClick={() => this.props.column.onClick(this.props.item)} />
            case ColumnTypes.Input:
                return <EditableCell value={this.props.item[this.props.column.field]} onChange={(v) => this.onItemChange(v, this.props.item, this.props.column.field)} />
            case ColumnTypes.Date:
                return moment(this.props.item[this.props.column.field]).format("DD/MM/YYYY")
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