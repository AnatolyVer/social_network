import React from 'react';

import classes from './styles.module.scss'

interface StatProps{
    title:string,
    num1: number,
    num2: number,
    num3: number
}

function Stat({title, num1, num2, num3}:StatProps) {


    return (
        <div className={`${classes.Stat}`}>
            <p className={classes.Title}>{title}</p>
            <div className={classes.Body}>
                <div className={classes.Stat}>
                    <p className={classes.Num}>{num1}</p>
                    <p className={classes.Text}>користувачів</p>
                </div>
                <div className={classes.Stat}>
                    <p className={classes.Num}>{num2}</p>
                    <p className={classes.Text}>публікацій</p>
                </div>
                <div className={classes.Stat}>
                    <p className={classes.Num}>{num3}</p>
                    <p className={classes.Text}>фотографій</p>
                </div>
            </div>
        </div>
    );
}

export default Stat;
