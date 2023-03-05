import * as React from "react";
import * as FontAwesome from "react-fontawesome";

export enum ColumnTypes{
    Button = "button",
    Input = "input",
    Date = "date",
    Html = "html",
    No = "No",
    Check = "check"
}

export interface ColumnModel{
    type?: ColumnTypes,
    title: string,
    field?: string,
    width?: string,
    onChange?: (item: any) => void,
    sortable?: boolean,
    icon?: string,
    onClick?: (item: any) => void
    hide?: boolean,
    hint?: string,
    disabled?: (item: any) => boolean,
    cellStyle?: React.CSSProperties,
    isDefaultSortOrder?: boolean
}

export interface ColumnProps{
    index?: number,
    column: ColumnModel,
    sortField: string,
    sortAsc: boolean,
    onSort: (field: string, asc: boolean) => void
}

class Column extends React.PureComponent<ColumnProps>{
    render(){
        if(this.props.column.hide) return null
        return <th key={this.props.index} style={{width: this.props.column.width}}>
        {this.props.column.title}
        {
            this.props.column.sortable &&
            (this.props.sortAsc || (this.props.sortField != this.props.column.field) ? 
                <FontAwesome name="caret-up" className="sort-control" onClick={() => this.props.onSort(this.props.column.field, false)} /> 
                : <FontAwesome name="caret-down" className="sort-control" onClick={() => this.props.onSort(this.props.column.field, true)} />)
        }
        </th>
    }
}
export default Column;