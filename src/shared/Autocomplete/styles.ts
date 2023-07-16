import {styled, TextField} from "@mui/material";

export const LightTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: 'black', // Цвет текста
        marginTop:'-7px !important',
        backgroundColor:'transparent !important',
        zIndex:'2'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent !important',
            borderRadius:'20px',
            height: '45px',
            backgroundColor:'#F3F3F3 !important',
        },
        '&:hover fieldset': {
            borderColor: 'transparent !important', // Цвет рамки при наведении
            backgroundColor:'#F3F3F3 !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent !important',// Цвет рамки при фокусе
            backgroundColor:'#F3F3F3 !important',
        },
        '& .MuiButtonBase-root': {
            color: 'black', // Измените цвет текста кнопок
            marginTop:'-5px',
            zIndex:'5'
        },
    },
    '& .MuiInputLabel-root': {
        color: 'black !important',
        marginTop: '-7px !important', // Цвет заполнителя (placeholder)
    },
    '& .MuiFormHelperText-root':{
        marginTop:'-5px !important',
    }
});

export const DarkTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: 'white', // Цвет текста
        marginTop:'-7px !important',
        backgroundColor:'transparent !important',
        zIndex:'2'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent !important',
            borderRadius:'20px',
            height: '45px',
            backgroundColor:'#333333 !important',
        },
        '&:hover fieldset': {
            borderColor: 'transparent !important', // Цвет рамки при наведении
            backgroundColor:'#333333 !important',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent !important',// Цвет рамки при фокусе
            backgroundColor:'#333333 !important',
        },
        '& .MuiButtonBase-root': {
            color: 'white', // Измените цвет текста кнопок
            zIndex:'5',
            marginTop:'-5px'
        },
    },
    '& .MuiInputLabel-root': {
        color: 'white !important',
        marginTop: '-7px !important', // Цвет заполнителя (placeholder)
    },
    '& .MuiFormHelperText-root':{
        marginTop:'-5px !important',
    }
});