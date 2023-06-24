import {styled} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

export const LightDatePicker = styled(DatePicker)({
    '& .MuiInputBase-input': {
        color: 'black', // Цвет текста
        marginTop:'-7px !important',
        backgroundColor:'transparent !important',
        zIndex:'2'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'transparent !important', // Цвет рамки
            borderRadius:'20px',
            height: '45px',
            backgroundColor:'#F3F3F3 !important',
        },
        '&:hover fieldset': {
            borderColor: 'transparent !important', // Цвет рамки при наведении
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent !important', // Цвет рамки при фокусе
        },
    },
    '& .MuiInputLabel-root': {
        color: 'black !important', // Цвет заполнителя (placeholder)
        marginTop: '-7px !important',
    },
    '& .MuiIconButton-root': {
        color: 'black !important', // Цвет иконки
        zIndex:'2 !important',
        marginTop:'-7px !important'
    },
});

export const DarkDatePicker = styled(DatePicker)({
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
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent !important', // Цвет рамки при фокусе
        },
        '&.Mui-error fieldset': {
            borderColor: 'red !important', // Цвет рамки при ошибке
        },

    },
    '& .MuiPickersPopper-paper': {
        backgroundColor: 'black', // Фоновый цвет календаря
    },
    '& .MuiInputLabel-root': {
        color: 'white !important', // Цвет заполнителя (placeholder)
        marginTop: '-7px !important',
    },
    '& .MuiIconButton-root': {
        color: 'white !important', // Цвет иконки
        zIndex:'2 !important',
        marginTop:'-7px !important'
    },
});