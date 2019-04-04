import * as React from "react";
import Modal from "../modal/modal";

export interface ConfirmProps{
    show: boolean,
    title: string,
    text: string,
    onConfirm: any,
    onClose: any
}

class Confirm extends React.Component<ConfirmProps>{
    constructor(props){
        super(props);
    }

    render(){
        return this.props.show && <Modal>
            <Modal.Header title={this.props.title} onClose={this.props.onClose} />
            <Modal.Body><p className="confirm-body-text">{this.props.text}</p></Modal.Body>
            <Modal.Footer>
                <Modal.FooterButton icon="check" label="Ok" onClick={this.props.onConfirm} />
                <Modal.FooterButton icon="times" label="Cancel" onClick={this.props.onClose} />
            </Modal.Footer>
        </Modal>
    }
}
export default Confirm;