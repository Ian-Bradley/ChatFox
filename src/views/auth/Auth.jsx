import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from 'Util/api/websocket.js';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import { Container, Forms, Error } from './styles.js';
import Remember from './components/Remember.jsx';
import Swapper from './components/Swapper.jsx';
import Logos from './components/Logos.jsx';
import Title from 'Shared/Title/Title.jsx';
import Form from './components/Form.jsx';
import Fun from './components/Fun.jsx';

// REDUX
import { setSocketOpen } from 'Redux/slices/socket.slice.js';
import { setUserData } from 'Redux/slices/user.slice.js';
import { setLoggedIn } from 'Redux/slices/app.slice.js';

// UTIL
import { setCookie, getCookie, deleteCookie } from 'Util/helpers/functions.js';
import { MODE_DEV } from 'Util/helpers/constants.js';
import api from 'Util/api/axios.js';

export default function PageAuth(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const LOGGED_IN = useSelector((state) => {
        return state['app'].app.loggedIn;
    });

    // Hooks
    const [accountError, setAccountError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [formType, setFormType] = useState('login');
    const navigate = useNavigate();
    const socket = useSocket();
    const formRef = useRef();

    // Hooks - Fun
    const [currentLogo, setCurrentLogo] = useState(1);
    const [borderWidth, setBorderWidth] = useState(0);

    /*================================================
        BLOCK: HOOKS - LOGGED IN CHECK
    ==================================================*/

    useEffect(() => {
        if (LOGGED_IN) {
            MODE_DEV ? navigate('/chat', { replace: false }) : navigate('/chat', { replace: true });
        }
    }, [LOGGED_IN]);

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // EVENT: => onSubmit
    const onSubmit = async (formRef) => {
        try {
            // ==> Query
            const url = formType + '/';
            const data = {
                name: formRef.current[0].value,
                password: formRef.current[1].value,
            };
            const results = await api.post(url, data);
            console.log('results: ', results);

            // ==> Log In - Redux
            dispatch(setUserData({ id: results.data.id, name: results.data.name }));
            dispatch(setLoggedIn());

            // ==> Session
            if (isChecked) {
                setCookie('sessionid', results.data.token, 3);
            } else if (getCookie('sessionid')) {
                deleteCookie('sessionid');
            }

            // ==> Initiate
            dispatch(setSocketOpen());
            const userConnection = {
                type: 'userConnected',
                user: {
                    name: data.name,
                    color: 'ff3333',
                    nickname: data.name,
                },
            };
            socket.send(JSON.stringify(userConnection));

            // ==> Navigate
            navigate('/room', { replace: true });
        } catch (error) {
            console.error(error);

            if (!error.response.status) {
                setAccountError('Network error');
            }

            if (error.response.status === 409 && formType === 'register') {
                setAccountError('User already exists');
            }

            if (error.response.status === 400 && formType === 'register') {
                setAccountError('Server error or bad request');
            }

            if (error.response.status === 400 && formType === 'login') {
                setAccountError('User does not exist');
            }

            if (error.response.status === 401 && formType === 'login') {
                setAccountError('Invalid password');
            }

            return [error.severity + ': ' + error.routine];
        }
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onRememberMe
    const onRememberMe = (e) => {
        e.target.checked ? setIsChecked(true) : setIsChecked(false);
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onFormSwap
    const onFormSwap = (e) => {
        e.preventDefault();
        setAccountError('');
        formType === 'login' ? setFormType('register') : setFormType('login');
    };

    /*================================================
        BLOCK: EVENTS - FUN
    ==================================================*/

    // EVENT: => onLogoSwap
    const onLogoSwap = (e) => {
        e.preventDefault();
        if (currentLogo > 1 && e.target.dataset.value === 'left') {
            setCurrentLogo(currentLogo - 1);
        }
        if (currentLogo < 5 && e.target.dataset.value === 'right') {
            setCurrentLogo(currentLogo + 1);
        }
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onBorderGrow
    const onBorderGrow = (e) => {
        e.preventDefault();
        if (borderWidth > 0 && e.target.dataset.value === 'shrink') {
            setBorderWidth(borderWidth - 1);
        }
        if (borderWidth < 50 && e.target.dataset.value === 'grow') {
            setBorderWidth(borderWidth + 1);
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/
    return (
        <>
            <Container borderWidth={borderWidth}>
                <Fun onLogoSwap={onLogoSwap} onBorderGrow={onBorderGrow} />
                <Logos currentLogo={currentLogo} />
                <Title />
                <Forms form={formType} ref={formRef}>
                    <Form buttonText={'Sign in'} onSubmit={onSubmit} />
                    <Form buttonText={'Register'} onSubmit={onSubmit} />
                </Forms>
                <Error error={accountError}>{accountError}</Error>
                <Remember onRememberMe={onRememberMe} />
                <Swapper onFormSwap={onFormSwap} />
            </Container>
        </>
    );
}
