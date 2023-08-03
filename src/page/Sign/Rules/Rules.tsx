import React from 'react';
import {useSelector} from "react-redux";

import {State} from "@redux/store";

import {Checkbox} from "@mui/material";
import classes from "../styles.module.scss";

interface RulesProps{
    checked: boolean,
    onClick: () => void
}

const Rules = ({checked, onClick}:RulesProps) => {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <>
            <div className={classes.RulesField}>
                <Checkbox sx={{color: theme === 'light' ? "black" : "white"}} checked={checked} onClick={onClick}/>
                <div className="flex">
                    <p>Я прочитав і приймаю &nbsp;</p>
                    <p className={classes.Rules}>Правила</p>
                    <p>&nbsp; та &nbsp;</p>
                    <p className={classes.Rules}>Умови</p>
                </div>
            </div>
        </>
    );
};

export default Rules;