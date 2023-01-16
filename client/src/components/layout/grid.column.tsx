import * as React from "react";
import * as classnames from 'classnames';

export const GridColumn = (props) => {
    return <div className={classnames('grid-column', props.className)}>{props.children}</div>
}