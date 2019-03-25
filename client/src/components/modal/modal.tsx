import * as React from "react";
import * as ReactDOM from "react-dom";
import ModalHeader from "./modal.header";
import ModalFooter from "./modal.footer";
import ModalBody from "./modal.body";
import ModalFooterButton from "./modal.footer.button";

const modalRoot = document.body;

export default class Modal extends React.Component<any, any>{
    modalLayout: HTMLElement;
    modalContent: HTMLElement;
    static Header = ModalHeader;
    static Footer = ModalFooter;
    static Body = ModalBody;
    static FooterButton = ModalFooterButton;

    constructor(props){
        super(props);
        this.modalLayout = document.createElement("div");
        this.modalLayout.className = "modal-black-out";
        this.modalContent = document.createElement("div");
        this.modalContent.className = "modal-content";
        this.modalLayout.appendChild(this.modalContent);
    }

    componentDidMount(){
        modalRoot.appendChild(this.modalLayout);
        this.modalContent.style.marginLeft = `${-this.modalContent.clientWidth / 2}px`;
        this.modalContent.style.marginTop = `${-this.modalContent.clientHeight / 2}px`;
    }

    componentWillUnmount(){
        modalRoot.removeChild(this.modalLayout);
    }

    render(){
        return ReactDOM.createPortal(this.props.children, this.modalContent);
    }
}