import * as React from "react";
import * as FontAwesome from "react-fontawesome";

export interface ModalHeaderProps{
    title: string,
    onClose: () => void
}

const ModalHeader = (props: ModalHeaderProps) => {
    return <div className="modal-header"><h4>{props.title}</h4><FontAwesome name="close" className="modal-close-icon" onClick={() => props.onClose()} /></div>
}
export default  ModalHeader;