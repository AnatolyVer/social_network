import React from 'react';
import {DateValidationError, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types';
import {DarkDatePicker, LightDatePicker } from './styles';

interface CustomDatePickerProps{
    theme:string,
    label: string,
    date: unknown,
    onChange: (value: unknown, context: PickerChangeHandlerContext<DateValidationError>) => void
}

export default function CustomDatePicker({theme, label, date, onChange}:CustomDatePickerProps) {

    const DatePicker = theme === 'light' ? LightDatePicker : DarkDatePicker

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={date}
                maxDate = {dayjs()}
                onChange={onChange}
            />
        </LocalizationProvider>
    )
}