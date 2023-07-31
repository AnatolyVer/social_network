import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {ErrorPageImage} from '@entities/ErrorPageImage';
import Footer from '@layout/Footer/Footer';
import Header from '@layout/Header/Header';
import {State} from "@redux/store";

import classes from './style.module.scss'

const InvalidPage = () => {

    const theme:string = useSelector((state:State) => state.theme)
    const nav = useNavigate()

    return (
        <div className="Page fullscreen-height flex column ai-c">
            <Header/>
            <div className={`Content flex ai-c fullness-height sa ${theme}Text`}>
               <ErrorPageImage/>
                <div className={`flex column c ${classes.ErrorPageContent}`}>
                    <p className={classes.PageNotFoundMessage}>Сторінку не знайдено</p>
                    <p style={{fontSize:'25px'}}>Схоже, вміст цього посилання було видалено або невірна URL адреса</p>
                    <button onClick={() => nav('../')} className={`${classes.Button} ${theme}Text`}>На головну</button>
                </div>
            <Footer/>
            </div>
        </div>
    );
};

export default InvalidPage;