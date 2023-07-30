import {getUserInfo} from "@redux/action-creators";
import {useDispatch} from "react-redux";

const GettingUser = () => {
    const dispatch = useDispatch()
    const nickname = localStorage.getItem("nickname")
    dispatch(getUserInfo(nickname!))
};

export default GettingUser;