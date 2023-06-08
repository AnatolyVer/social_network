import React from 'react';
import {useSelector} from "react-redux";
import {State} from "../../redux/store";

import classes from './styles.module.scss'

function Footer() {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`${classes.Footer} ${theme}Header`}>
            <div className={classes.Content}>
                <div className={classes.Message}>
                    👋 Увійдіть або зарєєструйтеся, щоб публікувати пости, коментувати, реагувати на дописи і т.д
                </div>
                <div className={classes.Sign}>
                    Увійти / Зареєструватися
                </div>
            </div>
            </div>

    );
}

export default Footer;
