import {styled} from "@mui/system";
import FormControl from "@mui/material/FormControl";

export const LightFormControl = styled(FormControl)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent !important',
            borderRadius:'20px',
            height: '45px',
            backgroundColor:'#F3F3F3 !important',
        },
        '&:hover fieldset': {
            borderColor: 'transparent !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent !important',
        },
        '&.Mui-error fieldset': { // Добавляем стиль для ошибки ввода
            borderColor: 'red !important',
        },
    },
    '& .MuiIconButton-root': {
        color: 'black !important',
        zIndex:'2 !important',
        marginTop: '-8px !important',
    },
    '& .MuiInputBase-input': {
        color: 'black !important',
        zIndex:'2 !important',
        marginTop: '-8px !important',
    },
    '& label':{
        color:'black !important',
        zIndex:'2 !important',
        marginTop: '-7px !important',
    },
});

export const DarkFormControl = styled(FormControl)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent !important',
            borderRadius:'20px',
            height: '45px',
            backgroundColor:'#333333 !important',
        },
        '&:hover fieldset': {
            borderColor: 'transparent !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent !important',
        },
        '&.Mui-error fieldset': { // Добавляем стиль для ошибки ввода
            borderColor: 'red !important',
        },
    },
    '& .MuiIconButton-root': {
        color: 'white !important',
        zIndex:'2 !important',
        marginTop: '-8px !important',
    },
    '& .MuiInputBase-input': {
        color: 'white !important',
        zIndex:'2 !important',
        marginTop: '-8px !important',
    },
    '& label':{
        color:'white !important',
        zIndex:'2 !important',
        marginTop: '-7px !important',
    },
});