import { useNavigate, Link } from 'react-router-dom';
import { useSocket } from '../../util/websocket.js';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// IMAGE COMPONENTS
import ImageLogo from '../../assets/images/sharechatfake.png';

// STYLED COMPONENTS
import {
    Form,
    Input,
    Label,
    Title,
    Image,
    Button,
    Checbox,
    Container,
    FormContainer,
    ImageContainer,
    TitleContainer,
    RememberContainer,
} from './styles.js';

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
    const [hasUserName, setHasUserName] = useState(false);
    const [hasPassword, setHasPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const socket = useSocket();

    /*================================================
        BLOCK: HOOK - USER INFO
    ==================================================*/

    useEffect(() => {
        console.log('---------- USE-EFFECT - Login check and user info ----------');
        if (user.loggedIn) {
            navigate('/room', { replace: true });
        }

        // TODO: cookies || localstorage w/ redux-persist
        // ==> get user info from storage
        // ==>
        // ==>
        // ==>
    });

    // FUNCTION: => handleLogin
    const handleLogin = async () => {
        console.log('===> START - handleLogin');
        if (hasUserName && hasPassword) {
            try {
                // ==> QUERY
                const res = await axios.get(`http://localhost:3001/api/user/1`); // change to auth route
                console.log(res);
                console.log(res.data);


                // ==> 


                // ==> STORAGE
                if (isChecked) {
                    // TODO: store in cookies/local
                }

                // ==> END
                console.log('===> END - handleLogin');
                navigate('/room', { replace: false }); // DEV
                // navigate('/room', { replace: true }); // PROD
            } catch (error) {
                console.error(error);
                console.log('===> END - handleLogin');
                return [error.severity + ': ' + error.routine];
            }
        } else {
            // TODO: add error to form around empty input
            console.log('===> END - handleLogin');
            return false;
        }
    };

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // FUNCTION: => onSubmitForm
    const onSubmitForm = (e) => {
        console.log('===> START - onSubmitForm');
        e.preventDefault();
        handleLogin();
        console.log('===> END - onSubmitForm');
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => onNameInput
    const onNameInput = (e) => {
        if (e.target.value && e.target.value.length) {
            setHasUserName(true);
            if (e.keyCode === 13) {
                console.log('===> START - onNameInput');
                e.preventDefault();
                handleLogin();
                console.log('===> END - onNameInput');
            }
        } else {
            setHasUserName(false);
        }
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => onPasswordInput
    const onPasswordInput = (e) => {
        if (e.target.value && e.target.value.length) {
            setHasPassword(true);
            if (e.keyCode === 13) {
                console.log('===> START - onPasswordInput');
                e.preventDefault();
                handleLogin();
                console.log('===> END - onPasswordInput');
            }
        } else {
            setHasPassword(false);
        }
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => onLoginButton
    const onLoginButton = (e) => {
        console.log('===> START - onLoginButton');
        e.preventDefault();
        handleLogin();
        console.log('===> END - onLoginButton');
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => onRememberMe
    const onRememberMe = (e) => {
        console.log('===> START - onRememberMe');
        if (e.target.checked) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
        console.log('===> END - onRememberMe');
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => onFormSwap
    const onFormSwap = (e) => {
        console.log('===> START - onFormSwap');
        e.preventDefault();
        // TODO: swap form functionality (post instead of get)
        console.log('===> END - onFormSwap');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <FormContainer>
                <ImageContainer>
                    <Image src={ImageLogo} alt='logo' />
                </ImageContainer>
                <TitleContainer>
                    <Title>Chattr</Title>
                </TitleContainer>
                <Form onSubmit={onSubmitForm}>
                    <Input type='text' onKeyUp={onNameInput} placeholder='User name' />
                    <Input type='password' onKeyUp={onPasswordInput} placeholder='Password' />
                    {/* <Input type='email' onKeyUp={onEmail} placeholder='Email' /> */}
                    <Button type='button' onClick={onLoginButton}>
                        Sign In
                    </Button>
                    <RememberContainer>
                        <Checbox id='remember-me' type='checkbox' onClick={onRememberMe} />
                        <Label htmlFor='remember-me'>Remember me</Label>
                    </RememberContainer>
                    <a href='javascript:void(0);' onClick={onFormSwap}>
                        Already have an account?
                        <br />
                        Click Here!
                    </a>
                    <br />
                    TESTING:
                    <Link to='/room'>room</Link>
                    <Link to='/eeeeeeeee'>error</Link>
                </Form>
            </FormContainer>
        </Container>
    );
}
