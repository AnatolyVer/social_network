import React, {useState} from 'react';

import SignedHeader from "./signedHeader";
import UnsignedHeader from "./unsignedHeader";

export default function Header() {
    const [search, setSearch] = useState("")

    const auth = localStorage.getItem('logged') === 'true'
    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

    return (
        <>
            {auth ? (
                <SignedHeader
                search={search}
                changeSearch={changeSearch}
            /> ) : (
                <UnsignedHeader
                search={search}
                changeSearch={changeSearch}
            />)}
        </>
    );
}

