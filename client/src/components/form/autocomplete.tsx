import * as React from "react";
import * as ReactDOM from "react-dom";

export interface AutocompleteProps{
    items: string[],
    top?: number,
    left?: number,
    chooseItem?: (item) => void
}

const root = document.body

class Autocomplete extends React.Component<AutocompleteProps>{
    window: HTMLElement;
    constructor(props){
        super(props);
        this.window = document.createElement("div");
        this.window.className = "autocomplete";
        this.window.style.top = `${this.props.top}px`;
        this.window.style.left = `${this.props.left}px`;
    }

    componentDidMount(){
        root.appendChild(this.window);
    }

    componentWillUnmount(){
        root.removeChild(this.window);
    }

    getItemsList = () => {
        return <ul>
            {
                this.props.items.map((item, index) => <li key={index} onClick={(e) => this.props.chooseItem(item)}>{item}</li>)
            }
        </ul>
    }

    render(){
        return ReactDOM.createPortal(this.getItemsList(), this.window);
    }
}
export default Autocomplete;