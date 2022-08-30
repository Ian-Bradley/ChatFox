import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

// COMPONENTS
import SocketHandler from 'Shared/SocketHandler/SocketHandler.jsx'
import PageError from 'Views/error/Error.jsx';
import PageAuth from 'Views/auth/Auth.jsx';
import PageChat from 'Views/chat/Chat.jsx';
import { ContainerApp } from './styles.js';
import Dev from 'Shared/Dev/Dev.jsx';

export default function App(props) {
    return (
        <>
            <ContainerApp>
                <Router>
                    <Routes>
                        <Route path='/' element={<PageAuth />}></Route>
                        <Route path='/room' element={<PageChat />}></Route>
                        <Route path='*' element={<PageError />}></Route>
                    </Routes>
                </Router>
            </ContainerApp>

            <SocketHandler />
            <Dev />
        </>
    );
}
