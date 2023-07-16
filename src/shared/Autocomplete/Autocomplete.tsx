import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import CustomAutocompleteTextField from "./CustomAutocompleteTextField";

export default function AutocompleteField({array, placement, changePlacement, onFocus, onBlur }: {onBlur: () => void, array:Array<string>, placement:string, changePlacement:(e:string) => Promise<void>, onFocus:() => void}) {

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={array}
            onChange={(event, newValue) => {
                changePlacement(newValue || '');
            }}
            value={placement}
            renderInput={(params) =>
                <CustomAutocompleteTextField
                    {...params}
                    value={placement!}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changePlacement(e.target.value)}
                    id="standard-basic"
                    label="Місто, країна"
                    variant="outlined"
                />}
        />
    );
}
