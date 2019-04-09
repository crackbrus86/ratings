import * as React from "react";
import * as classnames from "classnames";
import {ValidationResult} from "../../infrastructure/models";
import Autocomplete from "./autocomplete";

const doc = document;

export interface TextInputProps{
    label?: string,
    value?: string,
    classNames?: string[],
    validation?: ValidationResult,
    onChange?: (value: any) => void,
    autocomplete?: boolean,
    autocompleteItems?: string[]
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

    constructor(props){
        super(props);
        this.state = {
            isFocused: false
        }

        doc.addEventListener("click", (e) => this.unsetAsFocused(e))
    }

    componentWillUnmount(){
        doc.removeEventListener('click', (e) => this.unsetAsFocused(e))
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

    sortLargeStringArray = (array, locale) => {
        var collator = new Intl.Collator(locale);
        return array.sort(collator.compare);
    }

    render(){
        let autocompleteItems = !this.props.autocomplete ? [] : this.props.autocompleteItems.filter(x => x.toLowerCase().includes(this.props.value.toLowerCase()));
        autocompleteItems = this.sortLargeStringArray(autocompleteItems, 'ua');
        var offset = this.getAutocompleteOffset();
        return <>
            <div className={classnames('form-control', 'text-input', {'validation-error': this.props.validation && !this.props.validation.isValid})}>
                {this.props.label && <label>{this.props.label}</label>}
                <input type="text" value={this.props.value} 
                ref={(c) => this.inputObject = c}
                onKeyUp={(e) =>this.setAsFocused(e)}
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