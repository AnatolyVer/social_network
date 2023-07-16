import React from 'react';
import error from "../../shared/images/404.svg";

import classes from './style.module.scss'

import {useSelector} from "react-redux";
import {State} from "@redux/store";
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import {Link} from "react-router-dom";

const InvalidPage = () => {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={classes.InvalidPage}>
            <Header/>
            <div className={`${classes.Content} ${theme}Text`}>
                <img style={{width:'500px', height:'500px'}} src={error} alt=""/>
                <div style={{width:'700px', height:'500px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <p style={{textTransform:'uppercase', color:'#7C7C7C', fontSize:'45px'}}>Сторінку не знайдено</p>
                    <p style={{fontSize:'25px'}}>Схоже, вміст цього посилання було видалено або невірна URL адреса</p>
                    <Link to={'../'}>
                        <button className={`${classes.Button} ${theme}Text`}>На головну</button>
                    </Link>
                </div>
            <Footer/>
            </div>
        </div>
    );
};

export default InvalidPage;