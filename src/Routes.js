import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import React,{Fragment} from 'react';
import MainPage from './pages/mainPage';
import AuthCallbackPage from './pages/AuthCallbackPage';

export const Routez = () =>{
    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route path="/auth-callback" element={<AuthCallbackPage />}>
                    </Route>
                    <Route path="/main" element={<MainPage />}>
                    </Route>
                </Routes>
            </Fragment>

        </Router>
    )

}