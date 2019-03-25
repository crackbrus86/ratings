import * as React from "react";

export interface RadioButtonOption{
    label: string,
    value: string
}
export interface RadioButtonProps{
    name: string,
    label?: string,
    buttons: RadioButtonOption[],
    value?: string,
    onChange?: (value: string) => void
}

class RadioButton extends React.Component<RadioButtonProps>{
    constructor(props){
        super(props)
    }

    render(){
        return <div className="radio-button">
            <label>{this.props.label}{
                this.props.buttons.map((button, index) => <span key={index} className="radio-button-input">
                    <input 
                        type="radio" 
                        name={this.props.name} 
                        value={button.value} 
                        checked={button.value == this.props.value} 
                        onChange={(e) => this.props.onChange(e.target.value)} 
                    />{button.label}
                </span>)
            }</label>
        </div>
    }
}
export default RadioButton;