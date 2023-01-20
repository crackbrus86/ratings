import * as React from 'react';
import * as classnames from 'classnames';
import * as FontAwesome from 'react-fontawesome';

import { ValidationResult } from '../../infrastructure/models';
import * as Layout from '../layout/index.layout';

export interface SelectMultiProps {
    label?: string,
    value?: Array<string | number>,
    options?: SelectMultiOption<string | number>[],
    validation?: ValidationResult,
    onChange?: (value: Array<string | number>) => void
    classNames?: string
}

export interface SelectMultiOption<T> {
    text: string,
    value: T
}

const SelectMulti: React.FC<SelectMultiProps> = props => {

    const handleSelect = (value: string | number) => {
        const nextValue = [].concat(props.value).concat(value);
        props.onChange(nextValue);
    }

    const handleUnSelect = (value: string | number) => {
        const nextValue = props.value.filter(v => v !== value);
        props.onChange(nextValue);
    }

    const options = props.options.filter(opt => !props.value.includes(opt.value?.toString()));

    return <>
            <div className={classnames('form-control', 'select', { 'validation-error': props.validation && !props.validation.isValid }, props.classNames)}>
                {
                    props.label && <label>{props.label}</label>
                }
                <Layout.GridColumn className='multi-select__selector'>
                    <Layout.GridRow className='multi-select__values'>
                        {
                            props.value.map(val => <span key={val}  onClick={() => handleUnSelect(val)}>{val} <FontAwesome name='times' /></span>)
                        }
                    </Layout.GridRow>
                    {
                        props.validation && !props.validation.isValid &&
                        <span className='validation-error-message'>{props.validation.message}</span>
                    }
                    <Layout.GridRow>
                        <div className='multi-select__options'>
                            <ul>
                                {options.map(opt => <li key={opt.value} onClick={() => handleSelect(opt.value)}>{opt.text}</li>)}
                            </ul>
                        </div>
                    </Layout.GridRow>
                </Layout.GridColumn>
            </div>
        </>
};

export default SelectMulti;