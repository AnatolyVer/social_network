import React from 'react';
import {DarkTextField, LightTextField } from './styles';
import {useSelector} from "react-redux";
import {State} from "@redux/store";
import {InputError} from "@shared/TypesAndInterfaces/SignErrors/Errors"

interface TextFieldProps{
    label:string,
    value?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
    error?: InputError
}

export default function CustomTextField({label, value, onChange, required, error}:TextFieldProps) {

    const theme:string = useSelector((state:State) => state.theme)

    return(
        theme === 'light' ? (
            <LightTextField
                error={error?.border}
                helperText={error?.text}
                id="standard-basic"
                required={required}
                label={label}
                value={value}
                variant="outlined"
                onChange={onChange}/>
        ) : (
            <DarkTextField
                error={error?.border}
                helperText={error?.text}
                id="standard-basic"
                required={required}
                label={label}
                value={value}
                variant="outlined"
                onChange={onChange}
            />
        )
    )
}
