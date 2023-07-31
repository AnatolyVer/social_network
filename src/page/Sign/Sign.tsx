import {useSelector} from "react-redux";
import {State} from "@redux/store";

import {IFetch} from "@shared/TypesAndInterfaces/IFetch";
import Loader from '@entities/Loader/Loader';
import SignPage from './SignPage/SignPage';

export default function Sign() {

    const fetch:IFetch = useSelector((state:State) => state.fetch)

    return (fetch.loading ? <Loader/> : <SignPage/>);
}
