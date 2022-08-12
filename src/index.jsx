// REACT
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// WEBSOCKET
// import SocketProvider from '';

// COMPONENETS
import App from './app/App.jsx';
import Auth from './views/auth/Auth.jsx';
import Error from './views/error/Error.jsx';

ReactDOM.render(
    <Provider store={store}>
        {/* <SocketProvider> */}
        <Router>
            <Routes>
                <Route path='/' element={<Auth />}></Route>
                <Route path='/room' element={<App />}></Route>
                {/* <Route path='/room/:id' element={<App />}></Route> */}
                <Route path='*' element={<Error />}></Route>
            </Routes>
        </Router>
        {/* </SocketProvider> */}
    </Provider>,
    document.getElementById('root')
);
