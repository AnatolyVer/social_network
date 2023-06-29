import React, {useState} from "react";
import {checkSignEmail, checkSignNickname} from "../../../redux/action-creators";
import {IUser} from "@shared/TypesAndInterfaces/IUser";
import {useDispatch} from "react-redux";
import {Errors} from "@shared/TypesAndInterfaces/SignErrors/Errors";
import dayjs, {Dayjs} from "dayjs";

export default function useValidAndChange(user:IUser, changeUser: (updatedValues: Partial<IUser>) => void , changeErrors:(updatedValues: Partial<Errors>)=>void) {
    const dispatch = useDispatch()

    const [date, setDate] = useState<Dayjs | null | unknown>();
    const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value
        changeUser({username})
        if (username.length > 0) {
            changeErrors({username: {status: false, border: false, text: " "}})
        } else (
            changeErrors({username: {status: true, border: true, text: "Порожне поле"}})
        )
    }

    const changeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nickname = event.target.value
        const regex = /^[a-zA-Z0-9_]{0,16}$/;
        if (nickname.length > user.nickname!.length) {
            if (regex.test(nickname)) {
                changeErrors({nickname: {status: false, border: false, text: " "}})
                changeUser({nickname})
                dispatch(checkSignNickname(nickname))
            }
        } else {
            if (nickname.length > 0) {
                dispatch(checkSignNickname(nickname))
            } else changeErrors({nickname: {status: true, border: true, text: "Порожне поле"}})
            changeUser({nickname})
        }
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value
        changeUser({email})
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // Регулярное выражение
        if (email.length > 0) {
            const status = !regex.test(email)
            if (!status){
                dispatch(checkSignEmail(email))
                const border = status
                const text =" "
                changeErrors({email: {status, border, text}})
            }
            else {
                const border = status
                const text ="Невірний формат пошти"
                changeErrors({email: {status, border, text}})
            }
        } else (
            changeErrors({email: {status: true, border: true, text: "Порожнє поле"}})
        )
    }

    const validPassword = (password: string | undefined, confirmPassword: string | undefined) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (password?.length === 0 || confirmPassword?.length === 0) {
            changeErrors({password: {status: true, border: false, text: " "}})
        } else {
            if (passwordRegex.test(password || "") && password === confirmPassword) {
                changeErrors({password: {status: false, border: false, text: " "}})
            } else {
                if (password !== confirmPassword) {
                    changeErrors({password: {status: true, border: true, text: "Невірні паролі"}})
                }
            }
        }
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value
        changeUser({password})
        validPassword(password, user.confirmPassword)
    }

    const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPassword = event.target.value
        changeUser({confirmPassword})
        validPassword(user.password, confirmPassword)
    }

    const changeDate = (event: any) => {
        setDate(event)
        if (dayjs().isAfter(event) || dayjs().isSame(event)) {
            const birth_date = event.format('YYYY-MM-DD')
            changeUser({birth_date})
            changeErrors({birth_date: {status: false, border: false, text: " "}})
        } else {
            changeErrors({birth_date: {status: true, border: true, text: " "}})
        }
    }
    return {changeUsername, changeNickname, changeEmail, changePassword, changeConfirmPassword, changeDate, date}
}


