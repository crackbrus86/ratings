import * as React from "react";
import * as classnames from "classnames";
import {ValidationResult} from "../../infrastructure/models";
import Autocomplete from "./autocomplete";



export interface TextInputProps{
    label?: string,
    value?: string,
    classNames?: string[],
    validation?: ValidationResult,
    onChange?: (value: any) => void,
    autocomplete?: boolean,
    autocompleteItems?: string[],
    readonly?: boolean
}

interface TextInputState{
    isFocused: boolean
}

interface Position{
    top: number;
    left: number;
}

class TextInput extends React.Component<TextInputProps, TextInputState>{
    private inputObject;
    doc = document;
    constructor(props){
        super(props);
        this.state = {
            isFocused: false
        }

        this.doc.addEventListener("click", (e) => this.unsetAsFocused(e))
    }

    componentWillUnmount(){
        this.doc.removeEventListener('click', (e) => this.unsetAsFocused(e))
    }

    unsetAsFocused = (e) => {
        if(!e.defaultPrevented) this.setState({isFocused: false});
    }

    setAsFocused = (e) => {
        e.preventDefault();
        this.setState({isFocused: true})
    }

    getAutocompleteOffset = (): Position => {
        if(!this.inputObject) return {top: 0, left: 0};
        var rect = this.inputObject.getBoundingClientRect();
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    sortLargeStringArray = (array) => {
        var collator = new Intl.Collator();
        return array.sort(collator.compare);
    }

    render(){
        let autocompleteItems = !this.props.autocomplete || !this.props.value ? [] : this.props.autocompleteItems.filter(x => x.toLowerCase().includes(this.props.value.toLowerCase()));
        autocompleteItems = this.sortLargeStringArray(autocompleteItems);
        var offset = this.getAutocompleteOffset();
        return <>
            <div className={classnames('form-control', 'text-input', {'validation-error': this.props.validation && !this.props.validation.isValid})}>
                {this.props.label && <label>{this.props.label}</label>}
                <input type="text" value={this.props.value} 
                ref={(c) => this.inputObject = c}
                onKeyUp={(e) =>this.setAsFocused(e)}
                readOnly={this.props.readonly}
                onChange={(e) => this.props.onChange(e.target.value)} />
                {
                    !!autocompleteItems.length &&
                    this.state.isFocused && <Autocomplete 
                                                items={autocompleteItems} 
                                                top={offset.top} 
                                                left={offset.left}
                                                chooseItem={this.props.onChange}
                                                />
                }
            </div>
            {
                this.props.validation && !this.props.validation.isValid &&
                <span className="validation-error-message">{this.props.validation.message}</span>
            }
        </>
    }
}
export default TextInput;