import { useState} from 'react';
import dayjs from "dayjs";
import {IUser} from "@shared/TypesAndInterfaces/IUser";

export default function useUser() {
    const [user, setUser] = useState<IUser>({
        username:"",
        nickname:"",
        email:"",
        password:"",
        confirmPassword:"",
        birth_date:dayjs().format('YYYY-MM-DD')
    })

    const changeUser = (updatedValues: Partial<IUser>) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedValues,
        }));
    };

    return {user, changeUser} ;
}

