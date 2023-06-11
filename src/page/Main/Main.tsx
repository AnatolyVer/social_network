import React from 'react';

import classes from './styles.module.scss'

import Post from '../Profile/Posts/Post/Post';
import Comment from '../Profile/Posts/Comment/Comment'
import Stat from './Stat/Stat';

function Main() {

    return (
        <div className={`${classes.Main}`}>
            <div className={`${classes.Content}`} >
                <div className={classes.Part1}>
                    <div className="Left">
                        <div className={`${classes.circle} ${classes.blue}`}></div>
                        <div className={`${classes.circle} ${classes.magenta}`}></div>
                        <div className={`${classes.circle} ${classes.sky}`}></div>
                        <Post/>
                        <div className={classes.Comment}>
                            <Comment/>
                        </div>
                    </div>
                    <div className={classes.Right}>
                        <div>
                            <p className={classes.Title}>SOCIAL NETWORK</p>
                            <p className={classes.Message}>
                                Діліться своїми думками, обговорюйте та створюйте
                                власний контент.
                            </p>
                        </div>
                        <div className={classes.Sign}>
                            Увійти / Зареєструватися
                        </div>
                    </div>
                </div>
                <div className={classes.Part2}>
                    <Post/>
                    <div className={classes.Stats}>
                        <Stat title="За останні 24 години" num1={14} num2={14} num3={14}/>
                        <Stat title="За весь час" num1={14} num2={14} num3={14}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
