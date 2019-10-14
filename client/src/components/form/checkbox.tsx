import * as React from "react"
import * as classnames from "classnames"

export interface CheckBoxProps{
    label?: string
    isChecked?: boolean
    className?: string
    onChange?: () => void
}

export const CheckBox: React.FunctionComponent<CheckBoxProps> = (props: CheckBoxProps) => {
    return <div className={classnames("form-checkbox", props.className)}>
        {props.label && <label>{props.label}</label>}
        <input type="checkbox" checked={props.isChecked} onChange={props.onChange} />
    </div>
}

export default CheckBox