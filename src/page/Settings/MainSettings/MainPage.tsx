import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import dayjs, {Dayjs} from "dayjs";
import { isEqual } from 'lodash';

import PhotoUploader from "@page/Settings/PhotoUploader/PhotoUploader";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import {State} from "@redux/store";
import {editUser} from "@redux/action-creators";
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";
import CustomTextField from '@shared/CustomTextField/CustomTextField';
import useUser from '@shared/hooks/useUser';
import CustomDatePicker from "@shared/CustomDatePicker/CustomDatePicker";
import AutocompleteField from '@shared/Autocomplete/Autocomplete';

import classes from './styles.module.scss'
import {getPlacements} from "@redux/saga/API/user";

const MainPage = ({defaultUser, avatar, banner}:{defaultUser:IProfileInfo, avatar:IAvatarHook, banner:IAvatarHook}) => {

    const {user, changeUser} = useUser(defaultUser)
    const theme:string = useSelector((state:State) => state.theme)

    const dispatch = useDispatch()

    const [cities, setSities] = useState<Array<string>>([])

    const preplacement = user?.city?.length && user?.country?.length ? `${user.city}, ${user.country}` : ''
    const [placement, setPlacement] = useState<string>(preplacement)
    const [saveButtonIsVisible, setSaveButtonIsVisible] = useState(false)

    useEffect(() => {
        setSaveButtonIsVisible(isEqual(user, defaultUser));
    }, [user]);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value;
        const maxChars = 256;
        const maxRows = 7;

        if (inputValue.length <= maxChars && inputValue.split('\n').length <= maxRows) {
            changeUser({ biography: inputValue });
        }
    };

    const [date, setDate] = useState<Dayjs | null>(dayjs(user.birth_date));

    const changeDate = (event: any) => {
        setDate(event)
        const birth_date = event.format('YYYY-MM-DD')
        changeUser({birth_date})
    }

    const changePlacement = async (placement: string) => {
        const city = placement.split(',')[0]
        const country = placement.split(',')[1]
        setSities(new Array<string>())
        if (placement.length){
            const {data} = await getPlacements(city)
            data.map((obj:any) => {
                setSities(prevState => [...prevState, `${obj.LocalizedName}, ${obj.AdministrativeArea.LocalizedName}, ${obj.Country.LocalizedName}`])
            })
        }
        setPlacement(placement)
        changeUser({city, country})
    }

    const editUserData = () => {
        /*const modifiedData: Partial<IProfileInfo> = {};

        for (const key in user) {
            if (
                user.hasOwnProperty(key) &&
                defaultUser.hasOwnProperty(key) &&
                user[key as keyof IProfileInfo] !== defaultUser[key as keyof IProfileInfo]
            ) {
                modifiedData[key as keyof IProfileInfo] = user[key as keyof IProfileInfo];
            }
        }*/
        dispatch(editUser({...user, account_photo: avatar.avatar.fileToUpload, account_banner: banner.avatar.fileToUpload}))
    }

    return (
        <div className={`${classes.MainPage} ${theme}Text`}>
            <div className={classes.Up}>
                <div>
                    <p className={classes.Title}>Загальні дані</p>
                    <div className={classes.MainData}>
                        <CustomTextField value={user.username!} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeUser({username: e.target.value})} label="Ім'я користувача"/>
                        <CustomTextField value={user.nickname!} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeUser({nickname: e.target.value})} label="Нікнейм"/>
                        <CustomDatePicker date={date} onChange={changeDate} label="День народження"/>
                        <AutocompleteField onFocus={() => changePlacement(placement || new String as string)} placement={placement!} changePlacement={changePlacement} array={cities!}/>
                    </div>
                </div>
                <div>
                    <p className={classes.Title}>Зовнішній вигляд</p>
                    <div className={classes.Photos}>
                        <div>
                            <p className={classes.PhotoTitle}>Фото профіля</p>
                            <PhotoUploader aspect={1} photo={avatar}/>
                        </div>
                        <div>
                            <p className={classes.PhotoTitle}>Банер профіля</p>
                            <PhotoUploader aspect={256/49} photo={banner}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.Down}>
                <p className={classes.Title}>Про себе</p>
                <textarea
                    value={user.biography || ''}
                    onChange={handleDescriptionChange}
                    rows={7}
                    maxLength={256}
                    className={`${classes.TextBioArea} ${theme}Text ${theme}Post`}
                />
            </div>
            {!saveButtonIsVisible ? (
                <div onClick={editUserData} className={classes.Save}>
                    Зберегти
                </div>
            ): (
                <></>
            )
            }
        </div>
    );
};

export default MainPage;

