import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './page/Main/Main';
import Profile from "./page/Profile/Profile";

import classes from './App.module.scss'
import Sign from './page/Sign/Sign';
import {useDispatch} from "react-redux";
import {switchTheme} from "./redux/action-creators";
import Auth from './page/Auth/Auth';
import PhotoModalWindow from "./shared/PhotoModalWindow/PhotoModalWindow";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem("theme") == null) localStorage.setItem("theme", "light")
        dispatch(switchTheme(localStorage.getItem("theme") || 'light'))
    }, [])

  return (
    <div className={`${classes.App}`}>
        <BrowserRouter>
            <Routes>
                {/*<Route path="" element={<Navigate to="/profile" replace />} />*/}
                <Route path="" element={<Main/>} />
                <Route path="/profile/:nickname" element={<Profile/>}/>
                <Route path='/sign_up' element={<Sign/>}/>
                <Route path='/sign_in' element={<Auth/>}/>
            </Routes>
        </BrowserRouter>
        <PhotoModalWindow/>
    </div>
  );
}

export default App;
