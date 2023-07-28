import React from 'react';
import {TextFieldVariants} from "@mui/material";
import {DarkTextField, LightTextField } from './styles';
import {useSelector} from "react-redux";
import {State} from "@redux/store";
import {InputError} from "@shared/TypesAndInterfaces/SignErrors/Errors"

interface TextFieldProps{
    id:string,
    label:string,
    variant:TextFieldVariants | undefined,
    value?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
    error?: InputError
}

export default function CustomTextField({id, label, variant, value, onChange, required, error}:TextFieldProps) {

    const theme:string = useSelector((state:State) => state.theme)

    return(
        theme === 'light' ? (
            <LightTextField
                error={error?.border}
                helperText={error?.text}
                id={id}
                required={required}
                label={label}
                value={value}
                variant={variant}
                onChange={onChange}/>
        ) : (
            <DarkTextField
                error={error?.border}
                helperText={error?.text}
                id={id}
                required={required}
                label={label}
                value={value}
                variant={variant}
                onChange={onChange}
            />
        )
    )
}
