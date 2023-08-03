import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import SignButton from "../SignButton/SignButton";

import VerifyCode from "@entities/VerifyCode/VerifyCode";
import {State} from "@redux/store";
import {clearFetch, sendCode, sendEmail} from "@redux/action-creators";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import {IUser} from "@shared/TypesAndInterfaces/IUser";

import classes from "../styles.module.scss";

interface Props{
    user:IUser,
    avatar:File
}


const ThirdPage = ({user, avatar}:Props) => {

    const dispatch = useDispatch()
    const nav = useNavigate()

    const theme:string = useSelector((state:State) => state.theme)
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const [code, setCode] = useState<string>('')
    const [lastClickTime, setLastClickTime] = useState<Date | null>(null);
    const [disableButton, setDisableButton] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        handleClick()
    }, []);


    useEffect(() => {
        dispatch(clearFetch())
    }, [code])

    useEffect(() => {
        if (lastClickTime) {
            const currentTime = new Date();
            const difference = currentTime.getTime() - lastClickTime.getTime();
            const delay = 30000; // 30 seconds

            if (difference < delay) {
                const timeLeft = Math.floor((delay - difference) / 1000);
                setRemainingTime(timeLeft);
                setDisableButton(true);

                const timer = setInterval(() => {
                    setRemainingTime(prevTime => prevTime - 1);
                }, 1000);

                setTimeout(() => {
                    setDisableButton(false);
                    setLastClickTime(null);
                    clearInterval(timer);
                }, delay + 1000);

                return () => {
                    clearInterval(timer);
                };
            }
        }
    }, [lastClickTime]);

    const verify = () => {
        delete user.confirmPassword;
        dispatch(sendCode(code, user, avatar, nav))
    }

    const handleClick = () => {
        setLastClickTime(new Date());
        dispatch(sendEmail(user.email!))
    };

    return (
        <>
            {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
            <div className={classes.Message}>
                Ми надіслали вам 6-значний код на адресу <strong>{user.email}</strong> для перевірки пошти
            </div>
            <VerifyCode setCode={setCode} />
            <div className={classes.Resend}>
                {remainingTime ? (
                    <p>Повторно надіслати код через {remainingTime} сек.</p>
                ) : (
                    <p>Натисність, щоб надіслати код</p>
                )}
                <button onClick={handleClick} disabled={disableButton} className={`${classes.Send} ${theme}Text`}>Надіслати</button>
            </div>
            <SignButton next={verify} page={3} />
        </>
    );
};

export default ThirdPage;

