import {useEffect, useState} from 'react';
import {Errors} from "@shared/TypesAndInterfaces/SignErrors/Errors";

export default function useErrors() {
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
            status: false,
            border:false,
            text:" "
        }
    })

    const [isErrors, setIsErrors] = useState(true)

    useEffect(() => {
        const isAllStatusFalse = Object.values(errors).every((error) => !error.status);
        setIsErrors(isAllStatusFalse)
    }, [errors]);

    const changeErrors = (updatedValues: Partial<Errors>) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...updatedValues,
        }));
    };


    return {errors, isErrors, changeErrors} ;
}
