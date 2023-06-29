import BackButton from "../BackButton/BackButton";
import classes from "../styles.module.scss";

import HeaderSign from "../HeaderSign/HeaderSign";
import {useDispatch, useSelector} from "react-redux";
import {State} from "@redux/store";
import {IFetch} from "../../../shared/TypesAndInterfaces/IFetch";

import {IUser} from "@shared/TypesAndInterfaces/IUser";
import {Errors} from "@shared/TypesAndInterfaces/SignErrors/Errors";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import VerifyCode from "../../../shared/VerifyCode/VerifyCode";
import SignButton from "../SignButton/SignButton";
import {clearFetch, sendCode, sendEmail} from "../../../redux/action-creators";
import {useNavigate} from "react-router-dom";

interface Props{
    theme:string,
    progress:number,
    user:IUser,
    changeUser:(updatedValues: Partial<IUser>) => void,
    errors:Errors,
    changeErrors:(updatedValues: Partial<Errors>) => void,
    page:number,
    setPage:Dispatch<SetStateAction<number>>,
    avatar:File
}


const ThirdPage = ({theme, progress, user, page, setPage, avatar}:Props) => {

    const dispatch = useDispatch()
    const nav = useNavigate()

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
        dispatch(sendCode(code, user, avatar, nav))
    }

    const handleClick = () => {
        setLastClickTime(new Date());
        dispatch(sendEmail(user.email!))
    };

    return (
        <div className={classes.Sign}>
            <div className={`${classes.SignForm} ${theme}Post ${theme}Text`}>
                <BackButton theme={theme} prev={() => setPage(page-1)}/>
                <HeaderSign page={3} progress={progress}/>
                {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
                <div className={classes.Message}>
                    Ми надіслали вам 6-значний код на адресу <strong>{user.email}</strong> для перевірки пошти
                </div>
                <VerifyCode code={code} setCode={setCode} />
                <div className={classes.Resend}>
                    {remainingTime ? (
                        <p>Повторно надіслати код через {remainingTime} сек.</p>
                    ) : (
                        <p>Натисність, щоб надіслати код</p>
                    )}
                    <button onClick={handleClick} disabled={disableButton} className={`${classes.Send} ${theme}Text`}>Надіслати</button>
                </div>
                <SignButton theme={theme} next={verify} page={3} />
            </div>
        </div>
    );
};

export default ThirdPage;