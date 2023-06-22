import classes from "./styles.module.scss";
import React from "react";

interface SignButtonProps{
    theme:string,
    page: number,
    next: () => void,
    sign: () => void,
}

export default function SignButton({theme, page, next, sign}:SignButtonProps) {

    const button = page === 2 ? (
        <button onClick={sign} className={`${classes.SignButton} ${theme}Text`}>
            Зареєструватися
        </button>
    ) : (
        <button onClick={next} className={`${classes.SignButton} ${theme}Text`}>
            Далі
        </button>
    )

    return (
        <>
            {button}
        </>
    );
}


