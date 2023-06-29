import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Errors} from "@shared/TypesAndInterfaces/SignErrors/Errors";

export default function useErrors(setProgress:Dispatch<SetStateAction<number>>) {
    const [errors, setErrors] = useState<Errors>({
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

    useEffect(() => {
        const countFalseStatus = Object.values(errors).reduce((count, error) => {
            if (error.status === false) {
                return count + 1;
            }
            return count;
        }, 0);

        const isAllStatusFalse = countFalseStatus === Object.values(errors).length;
        setIsErrors(isAllStatusFalse);
        setProgress(countFalseStatus * 16.6)
    }, [errors]);

    const changeErrors = (updatedValues: Partial<Errors>) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...updatedValues,
        }));
    };


    return {errors, isErrors, changeErrors} ;
}
