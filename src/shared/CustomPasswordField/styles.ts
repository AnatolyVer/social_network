import {styled} from "@mui/system";
import FormControl from "@mui/material/FormControl";

export const LightFormControl = styled(FormControl)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black !important',
        },
        '&:hover fieldset': {
            borderColor: 'black !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black !important',
        },
        '&.Mui-error fieldset': { // Добавляем стиль для ошибки ввода
            borderColor: 'red !important',
        },
    },
    '& .MuiIconButton-root': {
        color: 'black !important',
    },
    '& .MuiInputBase-input': {
        color: 'black',
    },
    '& label':{
        color:'black !important',
    },
});

export const DarkFormControl = styled(FormControl)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white !important',
        },
        '&:hover fieldset': {
            borderColor: 'white !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white !important',
        },
        '&.Mui-error fieldset': { // Добавляем стиль для ошибки ввода
            borderColor: 'red !important',
        },
    },
    '& .MuiIconButton-root': {
        color: 'white !important',
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& label':{
        color:'white !important',
    },
});