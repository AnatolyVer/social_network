import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import Loader from '@entities/Loader/Loader';
import {State} from "@redux/store";
import {clearFetch, logUserAPI} from "@redux/action-creators";
import CustomTextField from "@shared/CustomTextField/CustomTextField";
import CustomPasswordField from "@shared/CustomPasswordField/CustomPasswordField";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";

import classes from './styles.module.scss'

export default function Auth() {

    const theme:string = useSelector((state:State) => state.theme)
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const dispatch = useDispatch()
    const nav = useNavigate()

    const [user, setUser] = useState({
        nickname_or_email:"",
        password:""
    })

    useEffect(() => {
        dispatch(clearFetch())
    }, [user])

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value
        setUser({...user, password})
    }

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nickname_or_email = event.target.value
        setUser({...user, nickname_or_email})
    }

    return (
        fetch.loading ? (
            <Loader/>
        ) : (
            <div className='flex c ai-c fullscreen-height'>
                <div className={`flex column c ab ${classes.AuthForm} ${theme}Post ${theme}Text`}>
                    <p className={`${classes.Title}`}>Авторізація</p>
                    {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
                    <div className={classes.Inputs}>
                        <CustomTextField onChange={changeLogin} value={user.nickname_or_email} label="Введіть нікнейм або пошту"/>
                        <CustomPasswordField value={user.password} onChange={changePassword} label="Введіть пароль"/>
                    </div>
                    <button onClick={() => dispatch(logUserAPI(user, nav))} className={`${classes.SignButton} ${theme}Text`}>
                        Продовжити
                    </button>
                    <Link to='/sign_up'>
                        <p className={`${classes.HasAccount} ${classes.Rules}`}>Немає акаунту? Зареєструватися</p>
                    </Link>
                </div>
            </div>
        )
    );
}
