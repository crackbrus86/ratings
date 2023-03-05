import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as classnames from "classnames";

export interface TableButtonProps {
    icon: string,
    disabled?: boolean,
    title?: string,
    onClick: () => void
}

const TableButton = (props: TableButtonProps) => {
    return <><span title={props.title} className={classnames('table-button', { 'disabled': props.disabled })} onClick={() => !props.disabled && props.onClick()}>
        <FontAwesome name={props.icon} />
    </span></>
}
export default TableButton;