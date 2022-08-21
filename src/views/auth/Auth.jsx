import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/axios.js';

// COMPONENTS
import Fun from './components/Fun.jsx';
import Logos from './components/Logos.jsx';
import Title from './components/Title.jsx';
import Inputs from './components/Inputs.jsx';
import Buttons from './components/Buttons.jsx';
import Swapper from './components/Swapper.jsx';
import Remember from './components/Remember.jsx';
import { Container, FormContainer, Form } from './styles.js';

// UTIL
import {
    REGEX_USERNAME,
    MAX_CHARACTERS_NAME,
    MAX_CHARACTERS_PASSWORD,
} from '../../util/constants.js';

export default function Auth(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    // const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state['user'].user;
    });

    // Hooks
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [formType, setFormType] = useState('login');
    const navigate = useNavigate();
    const formRef = useRef();

    // Hooks - Fun
    const [currentLogo, setCurrentLogo] = useState(1);
    const [borderWidth, setBorderWidth] = useState(0);

    /*================================================
        BLOCK: HOOKS
    ==================================================*/

    useLayoutEffect(() => {
        if (formType === 'login') {
        }
        if (formType === 'register') {
        }
    }, []);

    /*================================================*/
    /*================================================*/

    useEffect(() => {
        // TODO: maybe use JWT validation
        if (user.loggedIn) {
            navigate('/room', { replace: true });
        }

        // TODO: cookies || localstorage w/ redux-persist
        // ==> get user info from storage
        // ==>
        // ==>
        // ==>
    }, []);

    /*================================================
        BLOCK: FUNCTIONS
    ==================================================*/

    // FUNCTION: => validateInput
    const validateInput = (formRef) => {
        const inputName = formRef.current[0];
        const inputPassword = formRef.current[1];

        let errorName = false;
        let errorPassword = false;
        /*================================================*/
        if (!(inputName.value && inputName.value.length)) {
            setNameError('Name is required');
            errorName = true;
        }
        if (!(inputPassword.value && inputPassword.value.length)) {
            setPasswordError('Password is required');
            errorPassword = true;
        }
        /*================================================*/
        if (!(inputName.value.length >= MAX_CHARACTERS_NAME)) {
            setNameError('Name must be 3 characters or longer');
            errorName = true;
        }
        if (!(inputPassword.value.length >= MAX_CHARACTERS_PASSWORD)) {
            setPasswordError('Password must be 3 characters or longer');
            errorPassword = true;
        }
        /*================================================*/
        if (REGEX_USERNAME.test(inputName.value)) {
            setNameError('Name cannot contain special characters');
            errorName = true;
        }
        /*================================================*/
        if (!errorName) {
            setNameError('');
        }
        if (!errorPassword) {
            setPasswordError('');
        }
        if (errorName || errorPassword) {
            console.log('VALIDATE => return: FALSE');
            return false;
        }
        console.log('VALIDATE => return: TRUE');
        return true;
    };

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // EVENT: => onAccountSubmit
    const onAccountSubmit = async () => {
        console.log('===> START - onAccountSubmit');
        if (!validateInput(formRef)) {
            console.log('SUBMIT => validate: INVALID');
            return false;
        }
        console.log('SUBMIT => validate: VALID');
        console.log('SUBMIT => name: ', formRef.current[0].value);
        console.log('SUBMIT => password: ', formRef.current[1].value);
        try {
            // ==> QUERY
            const url = formType + '/';
            const data = {
                name: formRef.current[0].value,
                password: formRef.current[1].value,
            };
            const results = await api.post(url, data);
            console.log('results.data: ', results.data);

            // ==> STORAGE
            console.log('isChecked: ', isChecked);
            if (isChecked) {
                console.log('isChecked = true');
                // TODO: store in cookies/local
            }

            // ==> END
            console.log('===> END - onAccountSubmit');
            // navigate('/room', { replace: false }); // DEV
            // navigate('/room', { replace: true }); // PROD
        } catch (error) {
            console.error(error);

            // ==> USER ALREADY EXISTS
            if (error.response.status && error.response.status === 409) {
                console.log('USER ALREADY EXISTS');

            }

            // ==> INCORRECT PASSWORD
            if (error.response.status && error.response.status === 401) {
                console.log('INCORRECT PASSWORD');
                setPasswordError('Invalid password');
            }

            console.log('===> END - onAccountSubmit - async error');
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
                <Form onSubmit={onAccountSubmit} ref={formRef}>
                    <Inputs
                        formType={formType}
                        onAccountSubmit={onAccountSubmit}
                        nameError={nameError}
                        passwordError={passwordError}
                    />
                    <Buttons formType={formType} onAccountSubmit={onAccountSubmit} />
                    <Remember onRememberMe={onRememberMe} />
                    <Swapper onFormSwap={onFormSwap} />
                    <br />
                    TESTING:
                    <Link to='/room'>room</Link>
                    <Link to='/eeeeeeeee'>error</Link>
                </Form>
            </FormContainer>
        </Container>
    );
}
