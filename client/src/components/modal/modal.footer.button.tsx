import * as React from "react";
import * as FontAwesome from "react-fontawesome";
import * as classnames from "classnames";

export interface ModalFooterButtonProps {
    label: string,
    icon: string,
    disabled?: boolean,
    onClick: () => void
}

const ModalFooterButton = (props: ModalFooterButtonProps) => {
    return <><span className={classnames('modal-footer-button', { 'disabled': props.disabled })} onClick={() => !props.disabled && props.onClick()}>
        <FontAwesome name={props.icon} />{props.label}
    </span></>
}
export default ModalFooterButton;