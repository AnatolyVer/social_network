import classes from './styles.module.scss'
import {IProfileInfo} from "@shared/TypesAndInterfaces/IProfileInfo";
import CustomTextField from '../../../shared/CustomTextField/CustomTextField';
import useUser from '../../Sign/hooks/useUser';
import CustomDatePicker from "../../../shared/CustomDatePicker/CustomDatePicker";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useSelector} from "react-redux";
import {State} from "@redux/store";
import { isEqual } from 'lodash';

const API_KEY = 'AbJZ1oPWJbwhZ8PEgLR3PGw9guBFNgTR'

const MainPage = ({userToEdit}:{userToEdit:IProfileInfo}) => {

    const {user, changeUser} = useUser(userToEdit)
    const theme:string = useSelector((state:State) => state.theme)

    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        occupation: '',
        description: '',
    });

    const [placement, setPlacement] = useState(`${user.city}, ${user.country}`)
    const [saveButtonIsVisible, setSaveButtonIsVisible] = useState(false)

    useEffect(() => {
        setSaveButtonIsVisible(isEqual(user, userToEdit));
    }, [user]);


    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value;
        const maxChars = 200; // Максимальное количество символов
        const maxRows = 7; // Максимальное количество строк

        if (inputValue.length <= maxChars && inputValue.split('\n').length <= maxRows) {
            setFormData({ ...formData, description: inputValue });
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
        const res = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocompletex?apikey=${API_KEY}&q=${city}`)
        const data = await res.json()
        console.log(data)
        setPlacement(placement)
        changeUser({city, country})
    }

    return (user ? (
            <div className={`${classes.MainPage} ${theme}Text`}>
                <div className={classes.Up}>
                    <div>
                        <p className={classes.Title}>Загальні дані</p>
                        <div className={classes.MainData}>
                            <CustomTextField value={user.username!} onChange={(e) => changeUser({username: e.target.value})} id="standard-basic" label="Ім'я користувача" variant="outlined" />
                            <CustomTextField value={user.nickname!} onChange={(e) => changeUser({nickname: e.target.value})} id="standard-basic" label="Нікнейм" variant="outlined" />
                            <CustomDatePicker date={date} onChange={changeDate} label="День народження"/>
                            <CustomTextField value={placement} onChange={(e) => changePlacement(e.target.value)} id="standard-basic" label="Місцеположення" variant="outlined" />
                        </div>
                    </div>
                    <div>
                        <p className={classes.Title}>Зовнішній вигляд</p>
                        <div className={classes.Photos}>
                            <div>
                                <p className={classes.PhotoTitle}>Фото профіля</p>
                                <p className={classes.Download}>Завантажити</p>
                            </div>
                            <div>
                                <p className={classes.PhotoTitle}>Банер профіля</p>
                                <p className={classes.Download}>Завантажити</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.Down}>
                    <p className={classes.Title}>Про себе</p>
                    <textarea
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        rows={7} // Ограничение на количество строк
                        maxLength={256} // Ограничение на количество символов
                        className={`${classes.TextBioArea} ${theme}Text ${theme}Post`}
                    />
                </div>
                {!saveButtonIsVisible ? (
                    <div className={classes.Save}>
                        Зберегти
                    </div>
                ): (
                    <></>
                )
                }
            </div>
        ) : (
            <></>
        )
    );
};

export default MainPage;

