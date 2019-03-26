import * as React from "react";
import * as Datetime from "react-datetime";
import * as classnames from "classnames";
import { ValidationResult } from "../../infrastructure/models";

export interface DatePickerProps {
    label?: string,
    value?: Date,
    validation?: ValidationResult,
    onChange?: (date?: Date) => void
}

class DatePicker extends React.Component<DatePickerProps>{
    constructor(props) {
        super(props);
    }

    onChange = (date?: string) => {
        let nextDate = !isNaN(new Date(date).getTime()) ? new Date(date) : null;
        this.props.onChange(nextDate);
    }

    render() {
        return <>
            <div className={classnames('form-control', 'datepicker', { 'validation-error': this.props.validation && !this.props.validation.isValid })}>
                {
                    this.props.label && <label>{this.props.label}</label>
                }
                <Datetime
                    value={this.props.value}
                    dateFormat={'DD-MM-YYYY'}
                    timeFormat={false}
                    closeOnSelect={true}
                    onChange={(date) => this.onChange(date.toString())} />
            </div>
            {
                this.props.validation && !this.props.validation.isValid &&
                <span className="validation-error-message">{this.props.validation.message}</span>
            }
        </>
    }
}
export default DatePicker;