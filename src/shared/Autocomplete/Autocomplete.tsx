import Autocomplete from '@mui/material/Autocomplete';
import React from "react";
import CustomAutocompleteTextField from "./CustomAutocompleteTextField";

export default function AutocompleteField({array, placement, changePlacement, onFocus }: {array:Array<string>, placement:string, changePlacement:(e:string) => Promise<void>, onFocus:() => void}) {

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={array}
            onChange={(event, newValue) => {
                const result = newValue!.split(',')[0] + newValue!.split(',')[2]
                changePlacement(result || '');
            }}
            value={placement}
            renderInput={(params) =>
                <CustomAutocompleteTextField
                    {...params}
                    value={placement!}
                    onFocus={onFocus}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => changePlacement(e.target.value)}
                    id="standard-basic"
                    label="Місто, країна"
                    variant="outlined"
                />}
        />
    );
}
