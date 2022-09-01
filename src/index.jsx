// REACT
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.jsx';

// CSS
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'Styles/global.js';
import theme from 'Styles/theme.js';
import 'Styles/normalize.min.css';
import 'Styles/simplebar.min.css';
import 'Styles/fonts.css';

// REDUX
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from 'Util/api/websocket.js';
import { store, persistor } from 'Redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                <SocketProvider>
                    <GlobalStyles></GlobalStyles>
                    <App />
                </SocketProvider>
            {/* </PersistGate> */}
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);
