import React from 'react';
import classes from "../styles.module.scss";
import {Checkbox} from "@mui/material";

interface RulesProps{
    theme:string,
    page:number,
    checked: boolean,
    onClick: () => void
}

const Rules = ({theme, page, checked, onClick}:RulesProps) => {

    const agree = page === 2 ? (
        <div className={classes.RulesField}>
            <Checkbox sx={{color: theme === 'light' ? "black" : "white"}} checked={checked} onClick={onClick}/>
            <div className="flex">
                <p>Я прочитав і приймаю &nbsp;</p>
                <p className={classes.Rules}>Правила</p>
                <p>&nbsp; та &nbsp;</p>
                <p className={classes.Rules}>Умови</p>
            </div>
        </div>
    ) : (
        <></>
    )


    return (
        <>
            {agree}
        </>
    );
};

export default Rules;