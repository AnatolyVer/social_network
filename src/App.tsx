import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from './layout/Footer/Footer';
import Header from "./layout/Header/Header";
import Main from './page/Main/Main';
import Profile from "./page/Profile/Profile";

import classes from './App.module.scss'

function App() {

  const [auth, setAuthed] = useState(false)

  return (
    <div className={classes.App}>
        <Header auth = {auth}/>
        <BrowserRouter>
            <Routes>
                {/*<Route path="" element={<Navigate to="/profile" replace />} />*/}
                <Route path="" element={<Main/>} />
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
        {!auth ? <Footer/> : <></>}
    </div>
  );
}

export default App;
