import * as React from "react";
import TextInput from "./text.input";
import RadioButton from "./radio.button";
import Select from "./select";
import DatePicker from "./datepicker";
import CheckBox from "./checkbox";
import SelectMulti from "./select.multi";

class Form extends React.Component<any, any>{
    static TextInput = TextInput;
    static RadioButton = RadioButton;
    static Select = Select;
    static DatePicker = DatePicker;
    static CheckBox = CheckBox;
    static SelectMulti = SelectMulti;

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