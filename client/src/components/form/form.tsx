import * as React from "react";
import TextInput from "./text.input";
import RadioButton from "./radio.button";

class Form extends React.Component<any, any>{
    static TextInput = TextInput;
    static RadioButton = RadioButton;
    constructor(props){
        super(props);
    }

    render(){
        return <div className="form">
            {
                this.props.children
            }
        </div>
    }
}
export default Form;