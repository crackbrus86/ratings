import * as React from "react";
import * as classnames from 'classnames';

export const GridRow = (props) => {
    return <div className={classnames('grid-row', props.className)}>{props.children}</div>
}