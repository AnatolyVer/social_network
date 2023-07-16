import React from 'react';
import classes from "./styles.module.scss";
import verified from '../../../shared/images/verify.svg'
import not_verified from '../../../shared/images/pre_verify.svg'


const Banner = ({approved}:{approved:boolean}) => {

    const color = approved ? classes.blue : classes.gray

    return (
        <div className={`${classes.Banner} ${color}`}>
            <div className={classes.Content}>
                {approved ? (
                    <img src={verified} alt=""/>
                ) : (
                    <img src={not_verified} alt=""/>
                )}
                <div>
                    <p className={classes.Title}>Ваш поточний статус:</p>
                    <div style={{display:'flex'}}>
                        {!approved && (
                            <>
                                <p>НЕ</p>
                                &nbsp;
                            </>
                        )}
                        <p>ПІДТВЕРДЖЕНО</p>
                        {approved && (
                            <>
                                &nbsp;
                                <p>з</p>
                                &nbsp;
                                <p>4 липня 2023 р.</p>
                                &nbsp;
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;