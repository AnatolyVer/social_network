import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {InputErrors} from "@shared/TypesAndInterfaces/SignErrors/Errors";

export default function useErrors(setProgress:Dispatch<SetStateAction<number>>) {
    const [errors, setErrors] = useState<InputErrors>({
        username:{
            status: true,
            border:false,
            text:" "
        },
        nickname:{
            status: true,
            border:false,
            text:" "
        },
        email:{
            status: true,
            border:false,
            text:" "
        },
        password:{
            status: true,
            border:false,
            text:" "
        },
        birth_date:{
            status: true,
            border:false,
            text:" "
        }
    })

    const [isErrors, setIsErrors] = useState(true)

    const changeErrors = (updatedValues: Partial<InputErrors>) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...updatedValues,
        }));
        const countFalseStatus = Object.values(errors).reduce((count : number, error) => {
            if (error.status === false) {
                return count + 1;
            }
            return count;
        }, 0);

        const isAllStatusFalse = countFalseStatus === Object.values(errors).length;
        setIsErrors(isAllStatusFalse);
        setProgress(countFalseStatus * 16.6)
    };


    return {errors, isErrors, changeErrors} ;
}
