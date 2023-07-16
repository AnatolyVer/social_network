import {DarkTextField, LightTextField } from './styles';
import {useSelector} from "react-redux";
import {State} from "../../redux/store";

export default function CustomAutocompleteTextField(props:any) {

    const theme:string = useSelector((state:State) => state.theme)

    return(
        theme === 'light' ? (
            <LightTextField
                {...props}
            />
        ) : (
            <DarkTextField
                {...props}
            />
        )
    )
}
