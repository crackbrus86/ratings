import * as React from "react";
import * as FontAwesome from "react-fontawesome";

export interface ModalFooterButtonProps{
    label: string,
    icon: string,
    onClick: () => void
}

const ModalFooterButton = (props: ModalFooterButtonProps) => {
    return <><span className="modal-footer-button" onClick={() => props.onClick()}><FontAwesome name={props.icon} />{props.label}</span></>
}
export default  ModalFooterButton;