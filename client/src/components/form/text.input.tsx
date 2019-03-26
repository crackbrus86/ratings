import * as React from "react";
import * as classnames from "classnames";
import {ValidationResult} from "../../infrastructure/models";

export interface TextInputProps{
    label?: string,
    value?: string,
    classNames?: string[],
    validation?: ValidationResult,
    onChange?: (value: any) => void
}

class TextInput extends React.Component<TextInputProps>{
    constructor(props){
        super(props);
    }
    render(){
        return <>
            <div className={classnames('form-control', 'text-input', {'validation-error': this.props.validation && !this.props.validation.isValid})}>
                {this.props.label && <label>{this.props.label}</label>}
                <input type="text" value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)} />
            </div>
            {
                this.props.validation && !this.props.validation.isValid &&
                <span className="validation-error-message">{this.props.validation.message}</span>
            }
        </>
    }
}
export default TextInput;