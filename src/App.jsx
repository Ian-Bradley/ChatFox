import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';

// COMPONENTS
import SocketHandler from 'Shared/SocketHandler/SocketHandler.jsx';
import PageError from 'Views/error/Error.jsx';
import PageAuth from 'Views/auth/Auth.jsx';
import PageChat from 'Views/chat/Chat.jsx';
import { ContainerApp } from './styles.js';
import Dev from 'Shared/Dev/Dev.jsx';

// REDUX
import { setAppReady } from 'Redux/slices/app.slice.js';

// UTIL
import {
    CLASS_FADE,
    CLASS_HIDDEN,
    PAGE_LOAD_DELAY,
    PAGE_LOAD_TRANSITION_DELAY,
} from 'Util/helpers/constants.js';

export default function App(props) {
    // Redux
    const dispatch = useDispatch();
    const LOADING = useSelector((state) => {
        return state['app'].app.loading;
    });

    // Loader+Spinner
    useEffect(() => {
        if (LOADING) {
            setTimeout(() => {
                document.querySelector('#loader').classList += CLASS_FADE;
                setTimeout(() => {
                    document.querySelector('#loader').classList += ' ' + CLASS_HIDDEN;
                    dispatch(setAppReady());
                }, PAGE_LOAD_TRANSITION_DELAY);
            }, PAGE_LOAD_DELAY);
        }
    }, [LOADING]);

    // Components and routing
    return (
        <>
            <ContainerApp>
                <Router>
                    <Routes>
                        <Route path='/' element={<PageAuth />}></Route>
                        <Route path='/chat' element={<PageChat />}></Route>
                        <Route path='*' element={<PageError />}></Route>
                    </Routes>
                </Router>
            </ContainerApp>

            <SocketHandler />
            <Dev />
        </>
    );
}
