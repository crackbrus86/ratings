import * as React from "react";
import * as classnames from "classnames"

export interface Props{
    id?: string
    className?: string
    children?: any
}

export const ContentWrap = (props: Props) => {
    return <div id={props.id} className={classnames("content-wrap", props.className)}>{props.children}</div>
}