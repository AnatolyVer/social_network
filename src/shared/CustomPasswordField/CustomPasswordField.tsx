import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';
import {DarkFormControl, LightFormControl } from './styles';
import {InputError} from "../TypesAndInterfaces/SignErrors/Errors";

interface CustomPasswordFieldProps {
    theme: string;
    value?: string;
    text:string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    error?: InputError
}

function CustomPasswordField({ theme, value, onChange, text, error }: CustomPasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const CustomFormControl = theme === 'light' ? LightFormControl : DarkFormControl;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width:'100%' }}>
            <CustomFormControl sx={{width:'100%' }} variant="outlined">
                <InputLabel required htmlFor="outlined-adornment-password">{text}</InputLabel>
                <OutlinedInput
                    id={text}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Введіть пароль"
                    error={error && error.border}
                />
            </CustomFormControl>
        </Box>
    );
}

export default CustomPasswordField;
