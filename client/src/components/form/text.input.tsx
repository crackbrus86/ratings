import * as React from "react";

export interface TextInputProps{
    label?: string,
    value?: string,
    classNames?: string[],
    onChange?: (value: any) => void
}

class TextInput extends React.Component<TextInputProps>{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="text-input">
            <label>{this.props.label}<input type="text" value={this.props.value} onChange={(e) => this.props.onChange(e.target.value)} /></label>
        </div>
    }
}
export default TextInput;