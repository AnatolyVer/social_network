import React from 'react';
import classes from "./styles.module.scss";
import {useSelector} from "react-redux";
import {State} from "@redux/store";
import Banner from "./Banner";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const VerificationPage = () => {

    const theme:string = useSelector((state:State) => state.theme)

    const approved = true

    const conditions = [true, true, true];

    const button = conditions.every(val => val) ? classes.blue : classes.gray

    const ListItemComponent = ({colorCondition, text}:{colorCondition:boolean, text:string}) => (
        <li>
            <CheckCircleIcon sx={{color: colorCondition ? '#18B715' : 'gray'}} />
            <p>{text}</p>
        </li>
    );

    return (
        <div className={`${classes.VerificationPage} ${theme}Text`}>
            <Banner approved={approved}/>
            {
                approved ? (
                    <>
                        <p className={classes.Title}>
                            Важливо: дотримуйтесь Правил сайту, інакше акаунт буде позбавлений верифікованого статусу
                        </p>
                    </>
                ) : (
                    <>
                        <p className={classes.Title}>
                            Відповідність умовам:
                        </p>
                        <ul className={classes.Conditions}>
                            <ListItemComponent colorCondition={conditions[0]} text="Дотримання правил сайту" />
                            <ListItemComponent colorCondition={conditions[1]} text="Підтвердження публічності" />
                            <ListItemComponent colorCondition={conditions[2]} text="Активність" />
                        </ul>
                        <div className={`${classes.Button} ${button}`}>
                            Подати заявку
                        </div>
                    </>
                )
            }

            <div>

            </div>
        </div>
    );
};

export default VerificationPage;