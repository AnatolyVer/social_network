import React, { ReactNode, useState } from 'react';


import './select.scss'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const Select = ({children, defaultValue} : { children: ReactNode[], defaultValue: string}) => {

    const [visible, setVisible] = useState(true)

    const changeVisible = () => {
        setVisible(!visible)
    }

    const style = {height: "20px", width:"20px", color: "white"}

    const arrow = visible ? <KeyboardArrowDownIcon sx={style}/> : <KeyboardArrowUpIcon sx={style}/>

    return (
        <div className="select">
            <div onClick={changeVisible} >
                {arrow}
                <label className="label">{defaultValue}</label>
            </div>
            <div hidden={visible} onClick={changeVisible} className="options">
                {children}
            </div>
        </div>
    );
};

export default Select;