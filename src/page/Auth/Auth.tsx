import React, {useEffect, useState} from 'react';

import classes from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/store";
import CustomTextField from "../../shared/CustomTextField/CustomTextField";
import CustomPasswordField from "../../shared/CustomPasswordField/CustomPasswordField";


import {Link, useNavigate} from "react-router-dom";
import {clearFetch, logUserAPI} from "../../redux/action-creators";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import {Backdrop, CircularProgress} from "@mui/material";

export default function Auth() {

    const theme:string = useSelector((state:State) => state.theme)
    const fetch:IFetch = useSelector((state:State) => state.fetch)

    const nav = useNavigate()
    const dispatch = useDispatch()

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

    const sign = () => {
        dispatch(logUserAPI(user, nav))
    }

    const authForm = fetch.status === 999 ? (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    ) : (
        <div className={`${classes.AuthForm} ${theme}Post ${theme}Text`}>
            <p className={`${classes.Title}`}>Авторізація</p>
            {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
            <div className={classes.Inputs}>
                <CustomTextField required onChange={changeLogin} value={user.nickname_or_email} id="standard-basic" label="Введіть нікнейм або пошту" variant="outlined" />
                <CustomPasswordField theme={theme} value={user.password} text="Введіть пароль" onChange={changePassword}/>
            </div>
            <button onClick={sign} className={`${classes.SignButton} ${theme}Text`}>
                Продовжити
            </button>
            <Link to='/sign_up'>
                <p className={`${classes.HasAccount} ${classes.Rules}`}>Немає акаунту? Зареєструватися</p>
            </Link>
        </div>
    )

    return (
        <div className={classes.Auth}>
            {authForm}
        </div>
    );
}
