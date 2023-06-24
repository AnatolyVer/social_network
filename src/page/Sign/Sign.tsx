import React, {useEffect, useState} from 'react';

import classes from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/store";

import dayjs, { Dayjs } from 'dayjs';

import CustomTextField from "../../shared/CustomTextField/CustomTextField";
import CustomDatePicker from '../../shared/CustomDatePicker/CustomDatePicker';
import CustomPasswordField from "../../shared/CustomPasswordField/CustomPasswordField";
import {IUser} from '../../shared/TypesAndInterfaces/IUser';
import {Errors} from '../../shared/TypesAndInterfaces/SignErrors/Errors';
import SignButton from './SignButton/SignButton';
import BackButton from './BackButton/BackButton';
import HeaderSign from "./HeaderSign/HeaderSign";
import AvatarUploader from "./AvatarUploader/AvatarUploader";
import Rules from './Rules/Rules';
import {Link, useNavigate} from "react-router-dom";
import ava from "./default.png";
import {clearFetch, signUser} from '../../redux/action-creators';
import {IFetch} from "../../shared/TypesAndInterfaces/IFetch";
import {Backdrop, CircularProgress} from "@mui/material";

export default function Sign() {

    const nav = useNavigate()
    const dispatch = useDispatch()
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const [page, setPage] = useState(1)

    const [progress, setProgress] = useState(0)

    const theme:string = useSelector((state:State) => state.theme)

    const [checked, setChecked] = useState(false)

    const [canNext, setCanNext ] = useState(false)

    const [canSign, setCanSign ] = useState(false)

    const [avatar, setAvatar] = useState<File | null>()

    const [date, setDate] = useState<Dayjs | null | unknown>(dayjs());

    const [user, setUser] = useState<IUser>({
        username:"",
        nickname:"",
        email:"",
        password:"",
        confirmPassword:"",
        birth_date:dayjs().format('YYYY-MM-DD')
    })

    useEffect(() => {
        dispatch(clearFetch())
    }, [user])

    const [errors, setErrors] = useState<Errors>({
        username:{
            status: true,
            border:false,
            text:" "
        },
        nickname:{
            status: true,
            border:false,
            text:" "
        },
        email:{
            status: true,
            border:false,
            text:" "
        },
        password:{
            status: true,
            border:false,
            text:" "
        },
        birth_date:{
            status: false,
            border:false,
            text:" "
        }
    })

    useEffect(() => {
        const next = !errors.nickname.status && !errors.email.status && !errors.password.status
        const done = !errors.username.status && !errors.birth_date.status && checked
        setCanNext(next)
        setCanSign(done && next)
        if (done && next) setProgress(100)
        else if (next || done) setProgress(50)
        else if(!next && !done) setProgress(0)
    }, [errors, checked])

    const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value
        setUser({...user, username})
        if (username.length > 0){
            setErrors({...errors, username:{status:false, border:false, text:" "}})
        }
        else (
            setErrors({...errors, username:{status: true, border:true, text: "Порожне поле"}})
        )
    }

    const changeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nickname = event.target.value
        const regex = /^[a-zA-Z0-9_]{0,16}$/;
        if (regex.test(nickname))  setUser({...user, nickname})
        if (nickname.length > 0){
            setErrors({...errors, nickname:{status:false, border:false, text:" "}})
        }
        else (
            setErrors({...errors, nickname:{status: true, border:true,  text: "Порожне поле"}})
        )
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value
        setUser({...user, email})
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Регулярное выражение
        if (email.length > 0){
            const status = !regex.test(email)
            const border = status
            const text = status ? "Невірний формат пошти" : " "
            setErrors({...errors, email:{status, border, text}})
        }
        else (
            setErrors({...errors, email:{status:true, border:false, text:" "}})
        )
    }

    const validPassword = (password:string | undefined , confirmPassword:string | undefined) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (password?.length == 0 || confirmPassword?.length == 0){
            setErrors({...errors, password:{status: true, border:false , text:" "}})
        }
        else {
            if (passwordRegex.test(password || "") && password === confirmPassword) {
                setErrors({...errors, password:{status: false, border: false, text:" "}})
            } else {
                if (password !== confirmPassword){
                    setErrors({...errors, password:{status: true, border: true, text:"Невірні паролі"}})
                }
            }
        }
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value
        setUser({...user, password})
        validPassword(password, user.confirmPassword)
    }

    const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = event.target.value
        setUser({...user, confirmPassword})
        validPassword(user.password, confirmPassword)
    }

    const next = () => {
        if (canNext){
            setPage(2)
        }
    }

    const sign = () => {
        if (canSign){
            const { confirmPassword, ...userToSend } = user;
            dispatch(signUser(userToSend, avatar!, nav))
        }
    }

    const prev = () => {
        setPage(1)
    }

    const changeDate = (event:any) => {
        setDate(event)
        if (dayjs().isAfter(event) ||dayjs().isSame(event) ){
            const birth_date = event.format('YYYY-MM-DD')
            setUser({...user, birth_date})
            setErrors({...errors, birth_date:{status: false, border: false, text:" "}})
        }
        else{
            setErrors({...errors, birth_date:{status: true, border: true, text:" "}})
        }
    }


    const main =  page === 2 ?  (
        <>
            <AvatarUploader ava={ava} avatar={avatar} setAvatar={setAvatar} theme={theme}/>
            <div className={classes.Inputs}>
                <CustomTextField required error={errors.username} theme={theme} onChange={changeUsername} value={user.username} id="standard-basic" label="Введіть ім'я" variant="outlined" />
                <CustomDatePicker theme={theme} date={date} onChange={changeDate} label="Введіть день народження"/>
            </div>
        </>
    ) : (
        <>
            <div className={classes.Inputs}>
                <CustomTextField required error={errors.nickname} theme={theme} onChange={changeNickname} value={user.nickname} id="1" label="Введіть нікнейм" variant="outlined" />
                <CustomTextField required error={errors.email} theme={theme} onChange={changeEmail} value={user.email} id="2" label="Введіть E-mail" variant="outlined" />
               <div className={classes.Passwords}>
                   <CustomPasswordField error={errors.password} theme={theme} value={user.password} text="Введіть пароль" onChange={changePassword}/>
                   <CustomPasswordField error={errors.password} theme={theme} value={user.confirmPassword} text="Повторіть пароль" onChange={changeConfirmPassword}/>
               </div>
            </div>
        </>
    )

    return (fetch.status === 999 ? (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        ) : (
        <div className={classes.Sign}>
            <div className={`${classes.SignForm} ${theme}Post ${theme}Text`}>
                <BackButton theme={theme} prev={prev} visible={page === 2} />
                <HeaderSign page={page} progress={progress}/>
                {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
                {main}
                <div className={classes.SignField}>
                    <Rules theme={theme} page={page} checked={checked} onClick={() => setChecked(!checked)} />
                    <SignButton theme={theme} next={next} sign={sign} page={page} />
                    <Link to='/sign_in'>
                        <p className={`${classes.HasAccount} ${classes.Rules}`}>Вже маєте акаунт? Увійти</p>
                    </Link>
                </div>
            </div>
        </div>
    ));
}
