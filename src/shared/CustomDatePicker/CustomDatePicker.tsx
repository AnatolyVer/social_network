import {DateValidationError, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types';
import {DarkDatePicker, LightDatePicker } from './styles';
import {useSelector} from "react-redux";
import {State} from "../../redux/store";

interface CustomDatePickerProps{

    label: string,
    date: unknown,
    onChange: (value: unknown, context: PickerChangeHandlerContext<DateValidationError>) => void
}

export default function CustomDatePicker({label, date, onChange}:CustomDatePickerProps) {

    const theme:string = useSelector((state:State) => state.theme)

    const DatePicker = theme === 'light' ? LightDatePicker : DarkDatePicker

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={date}
                minDate={dayjs().subtract(70, 'year')}
                maxDate = {dayjs().subtract(14, 'year')}
                onChange={onChange}
            />
        </LocalizationProvider>
    )
}