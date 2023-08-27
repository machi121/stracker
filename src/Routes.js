import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import  FilePage  from './pages/filePage';
import React,{Fragment} from 'react';
import MainPage from './pages/mainPage';

export const Routez = () =>{
    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route path="/log" element={<FilePage/>}>
                    </Route>
                    <Route path="/main" element={<MainPage/>}>
                    </Route>
                </Routes>
            </Fragment>

        </Router>
    )

}