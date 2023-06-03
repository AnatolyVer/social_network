import React from 'react';
import './App.css';
import Profile from "./page/Profile/Profile";

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Header from "./layout/Header/Header";
function App() {

  return (
    <div className={`App`}>
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Navigate to="/profile" replace />} />
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
