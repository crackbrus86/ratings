import * as React from "react";
import * as classnames from "classnames";
import { ValidationResult } from "../../infrastructure/models";

export interface SelectProps {
    label?: string,
    value?: any,
    options?: SelectOption<any>[],
    validation?: ValidationResult,
    onChange?: (value: any) => void
}

export interface SelectOption<T = any> {
    text: string,
    value: any
}

class Select extends React.Component<SelectProps>{
    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <div className={classnames('form-control', 'select', { 'validation-error': this.props.validation && !this.props.validation.isValid })}>
                {
                    this.props.label && <label>{this.props.label}</label>
                }
                <select value={this.props.value || ""} onChange={(e) => this.props.onChange(e.target.value)}>
                    {
                        this.props.options.map((option, index) => <option key={index} value={option.value}>{option.text}</option>)
                    }
                </select>
            </div>
            {
                this.props.validation && !this.props.validation.isValid &&
                <span className="validation-error-message">{this.props.validation.message}</span>
            }
        </>
    }
}
export default Select;