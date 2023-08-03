import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {State} from "@redux/store";

import classes from './styles.module.scss'

function Footer() {

    const theme:string = useSelector((state:State) => state.theme)
    const auth = localStorage.getItem('logged') === 'true'

    return (!auth ? (
        <div className={`${classes.Footer} flex c ${theme}Header`}>
            <div className='Content flex sb ai-c'>
                <div className={classes.Message}>
                    👋 Увійдіть або зарєєструйтеся, щоб публікувати пости, коментувати, реагувати на дописи і т.д
                </div>
                <Link to="/sign_up">
                    <div className={`${classes.Sign}`}>
                        Увійти / Зареєструватися
                    </div>
                </Link>
            </div>
            </div>
        ) :(
                <></>
           )
    );
}

export default Footer;
