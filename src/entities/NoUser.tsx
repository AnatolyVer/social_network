import React from 'react';
import svg from "@shared/images/looking_release.svg";
import verify from "@shared/images/verify.svg";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {State} from "@redux/store";

import classes from "@page/Profile/styles.module.scss";

interface NoUserProps{
    nickname:string,
    similar:string[]
}

const NoUser = ({nickname, similar}:NoUserProps) => {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className={`${classes.NoUser} ${theme}Text`}>
            <img style={{width:'400px', height:'400px'}} src={svg} alt=""/>
            <div style={{width:'700px', height:'500px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                <div style={{display:'flex', marginBottom:'20px'}}>
                    <p style={{fontSize:'35px', textTransform:'uppercase', color:'#7C7C7C'}}>Користувача</p>
                    &nbsp;
                    &nbsp;
                    <strong style={{fontSize:'35px'}}>@{nickname}</strong>
                    &nbsp;
                    &nbsp;
                    <p style={{fontSize:'35px', textTransform:'uppercase', color:'#7C7C7C'}}>не знайдено</p>
                </div>
                {
                    similar.length ? (
                        <>
                            <p style={{ marginBottom: '30px', fontSize:'25px'}}>Можливо, ви шукали:</p>
                            <div>
                                {similar.map((account: any, index: number) => {
                                    if (index < 3) {
                                        return (
                                            <div key={index} style={{display:'flex', marginRight:'10px'}}>
                                                <p style={{fontSize:'28px', cursor:'pointer'}} key={index}>
                                                    <strong>@{account.nickname}</strong>
                                                </p>
                                                {account.is_verify && <img style={{width:'25px', marginLeft:'5px', marginTop:'5px'}} src={verify} alt=""/>}
                                            </div >
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <p style={{fontSize:'28px', marginTop:'20px'}}>Можливо цей акаунт було видалено власником або адміністрацією сайту</p>
                            <Link to={'../'}>
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