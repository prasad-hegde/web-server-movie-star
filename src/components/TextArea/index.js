import TextField from '@mui/material/TextField';
import {useEffect, useState } from 'react';
import { FormElement } from '../../commonStyle';


const textFormat = {
    hhmm: {
        isValid: (str) => /(0?[0-9]|1[0-9]|2[0-3])h (0?[0-9]|[1-5][0-9])min/.test(str),
        errorText:'Invalid format : example 2h 25min '
    },
    required: {
        errorText:'This is a required field'
    },
    email: {
        isValid:(email) =>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)
              .toLowerCase()),
        errorText:"Invalid format : e.g example@email.com"
    },
    default: {
        isValid: () => true,
        errorText:''
    }
    
}

export default function TextArea(props) {
    const { label = "label",
        multiline = false, format = 'default',
        type = "text",
        disabled = false,
        required = false ,onChange,value, submitFlag,hasError} = props;
    
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');


    function validate() {
        if (!required && !textFormat[format]) {
            return;
        }
        if (!value && required) {
            setError(true);
            setHelperText(textFormat.required.errorText)
        } else {
            if (!required && !value) {
                setError(false);
                setHelperText('');
                return;
            }
            const isValid = textFormat[format].isValid(value);
            if (isValid) {
                setError(false);
                setHelperText('');
            } else {
                setError(true);
                setHelperText(textFormat[format].errorText);
            }
        }
    }

    useEffect(() => {
        if (!required) {
            return;
        }
        if (submitFlag) {
            validate();
        }
    }, [submitFlag])
    
    useEffect(() => {
        hasError(error);
    },[error])
    
   
    function handleOnChange(val) {
        onChange(val)
    }
    
    return (
        <FormElement>
            <TextField
                fullWidth id="outlined-basic"
                label={label} variant="outlined"
                type={type}
                maxRows={6}
                value={value}
                key="textField"
                multiline={multiline}
                error={error}
                disabled={disabled}
                helperText={helperText}
                required={required}
                onChange={(event=>handleOnChange(event.target.value))}
                onBlur={validate}
            />
        </FormElement>
    )
}