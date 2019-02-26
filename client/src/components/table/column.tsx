import * as React from "react";

export enum ColumnTypes{
    Button = "button",
    Input = "input"
}

export interface ColumnModel{
    type?: ColumnTypes,
    title: string,
    field?: string,
    width?: string,
    onChange?: (item: any) => void
}

export interface ColumnProps{
    index?: number,
    column: ColumnModel
}

class Column extends React.PureComponent<ColumnProps>{
    render(){
        return <th key={this.props.index} style={{width: this.props.column.width}}>{this.props.column.title}</th>
    }
}
export default Column;