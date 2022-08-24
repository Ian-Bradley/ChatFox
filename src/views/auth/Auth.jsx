import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

// COMPONENTS
import { Container, FormContainer, Forms, Error } from './styles.js';
import Remember from './components/Remember.jsx';
import Swapper from './components/Swapper.jsx';
import Logos from './components/Logos.jsx';
import Title from 'Shared/Title/Title.jsx';
import Form from './components/Form.jsx';
import Fun from './components/Fun.jsx';

// REDUX
import { setName, setLoggedIn } from 'Redux/slices/user.slice.js';
import { setSocketOpen } from 'Redux/slices/socket.slice.js';

// UTIL
import api from 'Util/api/axios.js';

export default function AuthPage(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state['user'].user;
    });

    // Hooks
    const [accountError, setAccountError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [formType, setFormType] = useState('login');
    const navigate = useNavigate();
    const formRef = useRef();

    // Hooks - Fun
    const [currentLogo, setCurrentLogo] = useState(1);
    const [borderWidth, setBorderWidth] = useState(0);

    /*================================================
        BLOCK: HOOKS - LOGGED IN CHECK
    ==================================================*/

    useEffect(() => {
        // TODO: cookies || localstorage w/ redux-persist
        user.loggedIn ? console.log('LOGGED IN') : console.log('NOT LOGGED IN');
        if (user.loggedIn) {
            navigate('/room', { replace: false }); // DEV
            // navigate('/room', { replace: true }); // PROD
        }
    }, [user.loggedIn]);

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // EVENT: => onSubmit
    const onSubmit = async (formRef) => {
        // console.log('===> START - onSubmit');
        try {
            // ==> Query
            const url = formType + '/';
            const data = {
                name: formRef.current[0].value,
                password: formRef.current[1].value,
            };
            const results = await api.post(url, data);
            // console.log('results.data: ', results.data);

            // ==> User
            dispatch(setName(data.name));
            dispatch(setLoggedIn(true));

            // ==> Storage
            // console.log('isChecked: ', isChecked);
            if (isChecked) {
                console.log('isChecked = true');
                // TODO: store in cookies/local (redux-persist)
            }

            // ==> Initiate
            // get app data (messages/users/channels) from socket
            // done in useEffect() in App
            dispatch(setSocketOpen());

            // ==> Navigate
            navigate('/room', { replace: false }); // DEV
            // navigate('/room', { replace: true }); // PROD
            // console.log('===> END - onSubmit');
        } catch (error) {
            console.error(error);

            if (!error.response.status) {
                setAccountError('Network error');
            }

            if (error.response.status === 409 && formType === 'register') {
                setAccountError('User already exists');
            }

            if (error.response.status === 400 && formType === 'login') {
                setAccountError('User does not exist');
            }

            if (error.response.status === 401 && formType === 'login') {
                setAccountError('Invalid password');
            }

            // console.log('===> END - onSubmit - async error');
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
        <Container>
            <FormContainer borderWidth={borderWidth}>
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
                <br />
                TESTING:
                <Link to='/room'>room</Link>
                <Link to='/error'>error</Link>
            </FormContainer>
        </Container>
    );
}
