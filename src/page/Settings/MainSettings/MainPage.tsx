import classes from './styles.module.scss'
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";
import CustomTextField from '@shared/CustomTextField/CustomTextField';
import useUser from '@shared/hooks/useUser';
import CustomDatePicker from "@shared/CustomDatePicker/CustomDatePicker";
import React, {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {State} from "@redux/store";
import { isEqual } from 'lodash';
import AutocompleteField from '@shared/Autocomplete/Autocomplete';
import PhotoUploader from "@page/Settings/PhotoUploader/PhotoUploader";
import {IAvatarHook} from "@page/Sign/Interfaces/IAvatar";
import {editUser} from "@redux/action-creators";

const API_KEY = 'AbJZ1oPWJbwhZ8PEgLR3PGw9guBFNgTR'

const MainPage = ({defaultUser, avatar, banner}:{defaultUser:IProfileInfo, avatar:IAvatarHook, banner:IAvatarHook}) => {

    const {user, changeUser} = useUser(defaultUser)
    const theme:string = useSelector((state:State) => state.theme)

    const dispatch = useDispatch()

    const [cities, setSities] = useState<Array<string>>([])

    const [placement, setPlacement] = useState<string>(`${user.city}, ${user.country}`)
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
            const res = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${city}`)
            const data = await res.json()
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
                        <CustomTextField value={user.username!} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeUser({username: e.target.value})} id="standard-basic" label="Ім'я користувача" variant="outlined" />
                        <CustomTextField value={user.nickname!} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeUser({nickname: e.target.value})} id="standard-basic" label="Нікнейм" variant="outlined" />
                        <CustomDatePicker date={date} onChange={changeDate} label="День народження"/>
                        <AutocompleteField onFocus={() => changePlacement(placement || new String as string)} onBlur={() => changePlacement(new String as string)} placement={placement!} changePlacement={changePlacement} array={cities!}/>
                    </div>
                </div>
                <div>
                    <p className={classes.Title}>Зовнішній вигляд</p>
                    <div className={classes.Photos}>
                        <div>
                            <p className={classes.PhotoTitle}>Фото профіля</p>
                            <PhotoUploader circle={true} aspectUp={1} aspectDown={1} avatar={avatar}/>
                        </div>
                        <div>
                            <p className={classes.PhotoTitle}>Банер профіля</p>
                            <PhotoUploader circle={false} aspectUp={256} aspectDown={49} avatar={banner}/>
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

