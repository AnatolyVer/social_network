import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {State} from "@redux/store";

import SignedHeader from "./signedHeader";
import UnsignedHeader from "./unsignedHeader";

export default function Header() {
    const [search, setSearch] = useState("")

    const theme:string = useSelector((state:State) => state.theme)

    const auth = localStorage.getItem('logged') === 'true'
    const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

    return (
        <>
            {auth ? (
                <SignedHeader
                theme={theme}
                search={search}
                changeSearch={changeSearch}
            /> ) : (
                <UnsignedHeader
                theme={theme}
                search={search}
                changeSearch={changeSearch}
            />)}
        </>
    );
}

