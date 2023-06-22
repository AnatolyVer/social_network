import {styled} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

export const LightDatePicker = styled(DatePicker)({
    '& .MuiInputBase-input': {
        color: 'black', // Цвет текста
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black !important', // Цвет рамки
        },
        '&:hover fieldset': {
            borderColor: 'black !important', // Цвет рамки при наведении
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black !important', // Цвет рамки при фокусе
        },
    },
    '& .MuiInputLabel-root': {
        color: 'black !important', // Цвет заполнителя (placeholder)
    },
    '& .MuiIconButton-root': {
        color: 'black !important', // Цвет иконки
    },
});

export const DarkDatePicker = styled(DatePicker)({
    '& .MuiInputBase-input': {
        color: 'white', // Цвет текста
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white !important', // Цвет рамки
        },
        '&:hover fieldset': {
            borderColor: 'white !important', // Цвет рамки при наведении
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white !important', // Цвет рамки при фокусе
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
    },
    '& .MuiIconButton-root': {
        color: 'white !important', // Цвет иконки
    },
});