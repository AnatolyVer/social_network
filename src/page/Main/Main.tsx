
import Comment from '../Profile/Posts/Comment/Comment'
import Stat from './Stat/Stat';
import {useSelector} from "react-redux";
import {State} from "@redux/store";
import Header from "@layout/Header/Header";
import Footer from '@layout/Footer/Footer';
import { Link } from 'react-router-dom';


import classes from './styles.module.scss'

function Main() {

    const theme:string = useSelector((state:State) => state.theme)

    return (
        <div className='Page fullscreen-height flex column ai-c'>
            <Header/>
            <div className='Content fullness flex column se' >
                <section>
                    <div>
                        <div className={`${classes.circle} ${classes.blue}`}></div>
                        <div className={`${classes.circle} ${classes.magenta}`}></div>
                        <div className={`${classes.circle} ${classes.sky}`}></div>
                       {/* <Post/>*/}
                        <div className={classes.Comment}>
                            <Comment/>
                        </div>
                    </div>
                    <div className={classes.Right}>
                        <div>
                            <p className={`${classes.Title} ${theme}Text`}>SOCIAL NETWORK</p>
                            <p className={`${classes.Message} ${theme}Text`}>
                                Діліться своїми думками, обговорюйте та створюйте
                                власний контент.
                            </p>
                        </div>
                        <Link to="/sign_up">
                            <div className={`${classes.Sign} ${theme}Text`}>
                                Увійти / Зареєструватися
                            </div>
                        </Link>
                    </div>
                </section>
                <section>
                   {/* <Post/>*/}
                    <div className={classes.Stats}>
                        <Stat title="За останні 24 години" num1={14} num2={14} num3={14}/>
                        <Stat title="За весь час" num1={14} num2={14} num3={14}/>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    );
}

export default Main;
