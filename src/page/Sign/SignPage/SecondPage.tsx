import BackButton from "../BackButton/BackButton";
import AvatarUploader from "../AvatarUploader/AvatarUploader";
import CustomDatePicker from "../../../shared/CustomDatePicker/CustomDatePicker";
import classes from "../styles.module.scss";

import HeaderSign from "../HeaderSign/HeaderSign";
import Rules from "../Rules/Rules";
import SignButton from "../SignButton/SignButton";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {State} from "@redux/store";
import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import CustomTextField from "../../../shared/CustomTextField/CustomTextField";

import {InputErrors} from "@shared/TypesAndInterfaces/SignErrors/Errors";
import { IUser } from '@shared/TypesAndInterfaces/IUser';
import React, {Dispatch, SetStateAction} from "react";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import {setFetch} from "@redux/action-creators";
import {Dayjs} from "dayjs";


interface Props{
    theme:string,
    progress:number,
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


const SecondPage = ({theme, progress, user, errors, isErrors, page, setPage, avatar, checked, setChecked, date, changeDate, changeUsername}:Props) => {

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
        <div className={classes.Sign}>
            <div className={`${classes.SignForm} ${theme}Post ${theme}Text`}>
                <BackButton theme={theme} prev={() => setPage(page-1)}/>
                <HeaderSign page={2} progress={progress}/>
                {fetch.status === 404 ?  <p className={classes.Error}>{fetch.text}</p> : <></>}
                <AvatarUploader avatar={avatar} nickname={user.nickname!}/>
                <div className={classes.Inputs}>
                    <CustomTextField required error={errors.username} onChange={changeUsername} value={user.username} label="Введіть ім'я"/>
                    <CustomDatePicker date={date} onChange={changeDate} label="Введіть день народження"/>
                </div>
                <div className={classes.SignField}>
                    <Rules theme={theme} checked={checked} onClick={() => setChecked(!checked)} />
                    <SignButton theme={theme} next={toVerify} page={2} />
                    <Link to='/sign_in'>
                        <p className={`${classes.HasAccount} ${classes.Rules}`}>Вже маєте акаунт? Увійти</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SecondPage;