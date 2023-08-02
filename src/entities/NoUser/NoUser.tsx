import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { NotFound } from '../NotFound';

import VerifiedImage from "@entities/VerifiedImage";
import { State } from "@redux/store";

import classes from "./styles.module.scss";

interface NoUserProps {
    nickname: string;
    similar: string[];
}

const NoUser = ({ nickname, similar }: NoUserProps) => {

    const theme: string = useSelector((state: State) => state.theme);

    return (
        <div className={`flex sb ai-c fullness ${theme}Text`}>
            <NotFound />
            <div className={`flex column c`} style={{ width: '800px', height: '500px'}}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <p className={classes.Message}>Користувача
                        <strong className={`${theme}Text ${classes.Nickname}`}> @{nickname} </strong>
                        не знайдено
                    </p>
                </div>
                {
                    similar.length ? (
                        <>
                            <p style={{ marginBottom: '30px', fontSize: '25px' }}>Можливо, ви шукали:</p>
                            <div>
                                {similar.map((account: any, index: number) => {
                                    return (
                                        <div key={index} style={{ display: 'flex', marginRight: '10px' }}>
                                            <Link to={`/profile/${account.nickname}`} style={{ fontSize: '28px', cursor: 'pointer' }}>
                                                <strong>@{account.nickname}</strong>
                                            </Link>
                                            <VerifiedImage visible={account.is_verify} />
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <p style={{ fontSize: '28px', marginTop: '20px' }}>Можливо цей акаунт було видалено власником або адміністрацією сайту</p>
                            <Link to={`/`}>
                                <button className={`${classes.Button} ${theme}Text`}>На головну</button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default NoUser;
