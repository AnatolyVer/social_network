import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Main from '@page/Main/Main';
import Profile from "@page/Profile/Profile";
import Sign from '@page/Sign/Sign';
import Auth from '@page/Auth/Auth';
import Settings from '@page/Settings/Settings';
import InvalidPage from '@page/InvalidPage/InvalidPage';
import Posting from "@page/Posting/Posting";
import FullPost from "@page/FullPost/FullPost";

import PhotoModalWindow from "@shared/PhotoModalWindow/PhotoModalWindow";
import GettingUser from "@shared/preloading/Preloading";
import useThemeCustom from "@shared/hooks/useThemeCustom";

import classes from './App.module.scss'
export default function App() {

    useThemeCustom()
    GettingUser()

    return (
        <div className={`${classes.App}`}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Main/>} />
                    <Route path="*" element={<Navigate to="/error" replace />} />
                    <Route path="/error" element={<InvalidPage />} />
                    <Route path="/profile/:nickname" element={<Profile/>}/>
                    <Route path='/sign_up' element={<Sign/>}/>
                    <Route path='/sign_in' element={<Auth/>}/>
                    <Route path='/settings' element={<Navigate to="/settings/main" replace />}/>
                    <Route path='/settings/:page' element={<Settings/>}/>
                    <Route path='/posting' element={<Posting/>}/>
                    <Route path='/:nickname/post/:slug' element={<FullPost/>}/>
                </Routes>
            </BrowserRouter>
            <PhotoModalWindow/>
        </div>
      );
}
