import {styled, TextField} from "@mui/material";

export const LightTextField = styled(TextField)({
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
});

export const DarkTextField = styled(TextField)({
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
    },
    '& .MuiInputLabel-root': {
        color: 'white !important', // Цвет заполнителя (placeholder)
    },
});