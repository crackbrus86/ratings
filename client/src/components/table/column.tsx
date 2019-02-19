import * as React from "react";

export enum ColumnTypes{
    Button = "button",
    Input = "input"
}

export interface ColumnModel{
    type?: ColumnTypes,
    title: string,
    field?: string,
    width?: string
}

export interface ColumnProps{
    key?: number,
    column: ColumnModel
}

class Column extends React.PureComponent<ColumnProps>{
    render(){
        return <th key={this.props.key} style={{width: this.props.column.width}}>{this.props.column.title}</th>
    }
}
export default Column;