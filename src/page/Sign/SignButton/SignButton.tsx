import classes from "./styles.module.scss";

interface SignButtonProps{
    theme:string,
    page: number,
    next: () => void,
}

export default function SignButton({theme, page, next}:SignButtonProps) {

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


