import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store.js';

// COMPONENETS
// import Auth from './Auth.jsx';
// import Error from './Error.jsx';
import App from './components/App.jsx';

ReactDOM.render(
    <Provider store={store}>
        {/* <Wrapper> */}
        <Router>
            <Routes>
                <Route path='/'>
                    <App />
                    {/* <Auth /> */}
                </Route>
                <Route path='/chat'>
                    <App />
                </Route>
                <Route path='*'>
                    <App />
                    {/* <Error /> */}
                </Route>
            </Routes>
        </Router>
        {/* </Wrapper> */}
    </Provider>,
    document.getElementById('root')
);
