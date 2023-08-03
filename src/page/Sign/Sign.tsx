import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import dayjs from "dayjs";

import FirstPage from './SignPage/FirstPage';
import SecondPage from './SignPage/SecondPage';
import ThirdPage from './SignPage/ThirdPage';

import Loader from "@entities/Loader/Loader";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import HeaderSign from "@page/Sign/HeaderSign/HeaderSign";
import BackButton from "@page/Sign/BackButton/BackButton";
import {clearFetch} from "@redux/action-creators";
import {State} from "@redux/store";
import useUser from '@shared/hooks/useUser';
import useErrors from '@shared/hooks/useErrors';
import useAvatarUploading from "@shared/hooks/useAvatarUploading";
import {IUser} from "@shared/TypesAndInterfaces/IUser";
import useValidAndChange from "@shared/hooks/useValidAndChange";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";

import classes from "@page/Sign/styles.module.scss";

const defUser: IUser = {
    username: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birth_date: dayjs().format('YYYY-MM-DD')
};

const Sign = () => {

    const dispatch = useDispatch()

    const theme:string = useSelector((state:State) => state.theme)
    const signRed = useSelector((state:State) => state.sign)
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const [page, setPage] = useState(1)
    const [progress, setProgress] = useState(0)
    const [checked, setChecked] = useState(false)
    const [firstTime, setFirstTime] = useState(true)

    const {user, changeUser} = useUser(defUser)
    const {errors, isErrors, changeErrors} = useErrors(setProgress)
    const avatar:IAvatarHook = useAvatarUploading()
    const validAndChange = useValidAndChange(user, changeUser, changeErrors)


    useEffect(() => {
        dispatch(clearFetch())
    }, [user, checked, page])

    useEffect(() => {
        if (checked) setProgress(prevState => prevState + 17)
        else setProgress(prevState => prevState - 17)
    }, [checked]);

    useEffect(() => {
        if (!firstTime){
            const nicknameTextValid = signRed.nickname ? " " : 'Зайнято'
            const emailText = signRed.email ? " " : 'Зайнято'
            changeErrors({
                nickname:{status: !signRed.nickname, border:!signRed.nickname,  text: nicknameTextValid},
                email:{status: !signRed.email, border:!signRed.email,  text: emailText}
            })
        }
        setFirstTime(false)
    }, [signRed])

    const obj = {
        theme,
        page,
        setPage,
        user,
        changeUser,
        errors,
        isErrors,
        changeErrors
    }

    const signPages = [
        <FirstPage {...obj}/>,
        <SecondPage {...obj} avatar={avatar} checked={checked} setChecked={setChecked} {...validAndChange} />,
        <ThirdPage {...obj} avatar={avatar.avatar.fileToUpload!}/>
    ]

    return (fetch.loading ? (
        <Loader/>
    ) : (
        <div className='flex c ai-c fullscreen-height'>
            <div className={`flex column ai-c sb  ${classes.SignForm} ${theme}Post ${theme}Text`}>
                {page != 1 ? <BackButton prev={() => setPage(prevState => prevState-1)}/> : <></>}
                <HeaderSign page={page} progress={progress}/>
                {signPages[page-1]}
            </div>
        </div>
    ));

};

export default Sign;