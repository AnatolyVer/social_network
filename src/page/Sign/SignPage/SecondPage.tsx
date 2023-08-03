import React, {Dispatch, SetStateAction} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {Dayjs} from "dayjs";

import BackButton from "../BackButton/BackButton";
import AvatarUploader from "../AvatarUploader/AvatarUploader";
import Rules from "../Rules/Rules";
import SignButton from "../SignButton/SignButton";

import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import {State} from "@redux/store";
import {setFetch} from "@redux/action-creators";
import CustomDatePicker from "@shared/CustomDatePicker/CustomDatePicker";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import CustomTextField from "@shared/CustomTextField/CustomTextField";
import {InputErrors} from "@shared/TypesAndInterfaces/SignErrors/Errors";
import { IUser } from '@shared/TypesAndInterfaces/IUser';

import classes from "../styles.module.scss";

interface Props{
    theme:string,
    user:IUser,
    errors:InputErrors,
    isErrors:boolean,
    page:number,
    setPage:Dispatch<SetStateAction<number>>,
    avatar:IAvatarHook,
    checked:boolean,
    setChecked:Dispatch<SetStateAction<boolean>>,
    date:Dayjs | null | unknown,
    changeDate: (e:any) => void,
    changeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const SecondPage = ({user, errors, isErrors, page, setPage, avatar, checked, setChecked, date, changeDate, changeUsername}:Props) => {

    const fetch:IFetch = useSelector((state:State) => state.fetch)
    const dispatch = useDispatch()

    const toVerify = () => {

        if (isErrors && checked){
            setPage(page+1)
        }
        else{
           dispatch(setFetch({text: "Введіть усі данні до кінця", status:404, loading:false}))
        }
    }

    return (
        <>
            <BackButton  prev={() => setPage(prevState => prevState-1)}/>
            {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
            <AvatarUploader avatar={avatar} nickname={user.nickname!}/>
            <div className={classes.Inputs}>
                <CustomTextField required error={errors.username} onChange={changeUsername} value={user.username} label="Введіть ім'я"/>
                <CustomDatePicker date={date} onChange={changeDate} label="Введіть день народження"/>
            </div>
            <div className={classes.SignField}>
                <Rules checked={checked} onClick={() => setChecked(prevState => !prevState)} />
                <SignButton next={toVerify} page={2} />
                <Link to='/sign_in'>
                    <p className={`${classes.HasAccount} ${classes.Rules}`}>Вже маєте акаунт? Увійти</p>
                </Link>
            </div>
        </>
    );
};

export default SecondPage;