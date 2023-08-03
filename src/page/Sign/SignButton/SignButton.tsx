import {useSelector} from "react-redux";

import {State} from "@redux/store";

import classes from "./styles.module.scss";

interface SignButtonProps{
    page: number,
    next: () => void,
}

export default function SignButton({page, next}:SignButtonProps) {

    const theme:string = useSelector((state:State) => state.theme)

    const button = page === 3 ? (
        <button onClick={next} className={`${classes.SignButton} ${theme}Text`}>
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


