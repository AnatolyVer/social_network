import { useState } from 'react';

export default function useUser<T extends object>(defaultUser: Partial<T>) {

    const [user, setUser] = useState<T>(defaultUser as T);

    const changeUser = (updatedValues: Partial<T>) => {
        setUser((prevUser) => ({
            ...prevUser,
            ...updatedValues,
        }));
    };

    return { user, changeUser };
}
