import {useSelector} from "react-redux";
import {State} from "../../redux/store";

import classes from './styles.module.scss'
import {Link} from "react-router-dom";

function Footer() {

    const theme:string = useSelector((state:State) => state.theme)
    const auth = localStorage.getItem('logged') === 'true' ? true : false

    return (!auth ? (
        <div className={`${classes.Footer} ${theme}Header`}>
            <div className={classes.Content}>
                <div className={classes.Message}>
                    👋 Увійдіть або зарєєструйтеся, щоб публікувати пости, коментувати, реагувати на дописи і т.д
                </div>
                <Link to="/sign_up">
                    <div className={`${classes.Sign}`}>
                        Увійти / Зареєструватися
                    </div>
                </Link>
            </div>
            </div>) :(
                <></>
        )
    );
}

export default Footer;
