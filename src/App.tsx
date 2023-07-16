import {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Main from './page/Main/Main';
import Profile from "./page/Profile/Profile";

import classes from './App.module.scss'
import Sign from './page/Sign/Sign';
import {useDispatch} from "react-redux";
import {getUserInfo, switchTheme} from "./redux/action-creators";
import Auth from './page/Auth/Auth';
import PhotoModalWindow from "./shared/PhotoModalWindow/PhotoModalWindow";
import Settings from './page/Settings/Settings';
import InvalidPage from './page/Error/Error';
import Posting from "./page/Posting/Posting";
import FullPost from "./page/FullPost/FullPost";
function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("theme") == null) localStorage.setItem("theme", "light")
        dispatch(switchTheme(localStorage.getItem("theme") || 'light'))
        const nickname = localStorage.getItem("nickname")
        if (nickname != null) {
            dispatch(getUserInfo(nickname))
        }
    }, [])

  return (
    <div className={`${classes.App}`}>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<InvalidPage />} />
                {/*<Route path="" element={<Navigate to="/profile" replace />} />*/}
                <Route path="" element={<Main/>} />
                <Route path="/profile/:nickname" element={<Profile/>}/>
                <Route path='/sign_up' element={<Sign/>}/>
                <Route path='/sign_in' element={<Auth/>}/>
                <Route path='/settings/:page' element={<Settings/>}/>
                <Route path='/settings' element={<Navigate to="/settings/main" replace />}/>
                <Route path='/posting' element={<Posting/>}/>
                <Route path='/:nickname/post/:slug' element={<FullPost/>}/>
            </Routes>
        </BrowserRouter>
        <PhotoModalWindow/>
    </div>
  );
}

export default App;
