import React from 'react';
import {TextFieldVariants} from "@mui/material";
import {DarkTextField, LightTextField } from './styles';
import {Error} from '../TypesAndInterfaces/SignErrors/Errors'

interface TextFieldProps{
    theme:string,
    id:string,
    label:string,
    variant:TextFieldVariants | undefined,
    value?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean
    error?: Error
}

export default function CustomTextField({theme, id, label, variant, value, onChange, required, error}:TextFieldProps) {
    return(
        theme === 'light' ? (
            <LightTextField error={error?.border} helperText={error?.text} id={id} required={required} label={label} value={value} variant={variant} onChange={onChange}/>
        ) : (
            <DarkTextField error={error?.border} helperText={error?.text} id={id} required={required}  label={label} value={value} variant={variant} onChange={onChange}/>
        )
    )
}
