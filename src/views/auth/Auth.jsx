import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

// ICON COMPONENTS
import IconButton from '../../components/Buttons/IconButton.jsx';
import FormButton from '../../components/Buttons/FormButton.jsx';
import LeftSVG from '../../assets/icons/left.svg.js';
import RightSVG from '../../assets/icons/right.svg.js';
import UpSVG from '../../assets/icons/up.svg.js';
import DownSVG from '../../assets/icons/down.svg.js';

// LOGO COMPONENTS
import ImageLogo_1a from '../../assets/logos/logo_1a.png';
import ImageLogo_1b from '../../assets/logos/logo_1b.png';
import ImageLogo_1c from '../../assets/logos/logo_1c.png';
import ImageLogo_1d from '../../assets/logos/logo_1d.png';
import ImageLogo_1e from '../../assets/logos/logo_1e.png';

// STYLED COMPONENTS
import {
    Form,
    Input,
    Label,
    Title,
    Image,
    Swapper,
    Checbox,
    Container,
    FormContainer,
    ImageContainer,
    TitleContainer,
    RememberContainer,
    FunContainerLeft,
    FunContainerRight,
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
    const [formType, setFormType] = useState('login');
    const navigate = useNavigate();

    // Hooks - Fun
    const [currentLogo, setCurrentLogo] = useState(1);
    const [borderWidth, setBorderWidth] = useState(0);

    /*================================================
        BLOCK: HOOK - USER INFO
    ==================================================*/

    useEffect(() => {
        console.log('---------- USE-EFFECT - Login check and user info ----------');
        // TODO: maybe use JWT validation
        if (user.loggedIn) {
            navigate('/room', { replace: true });
        }

        // TODO: cookies || localstorage w/ redux-persist
        // ==> get user info from storage
        // ==>
        // ==>
        // ==>
    });

    /*================================================
        BLOCK: AUTH
    ==================================================*/

    // FUNCTION: => handleLogin
    const handleLogin = async () => {
        // TODO: password and name must be 3 characters min
        console.log('===> START - handleLogin');
        if (hasUserName && hasPassword) {
            try {
                // ==> QUERY
                const res = await axios.get(`http://localhost:3001/${formType}/`);
                console.log(res);
                console.log(res.data);

                // ==>

                // ==> STORAGE
                if (isChecked) {
                    console.log('isChecked = true');
                    // TODO: store in cookies/local
                }

                // ==> END
                console.log('===> END - handleLogin');
                // navigate('/room', { replace: false }); // DEV
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

    // EVENT: => onSubmitForm
    const onSubmitForm = (e) => {
        e.preventDefault();
        handleLogin();
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onNameInput
    const onNameInput = (e) => {
        if (e.target.value && e.target.value.length) {
            setHasUserName(true);
            if (e.keyCode === 13) {
                e.preventDefault();
                handleLogin();
            }
        } else {
            setHasUserName(false);
        }
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onPasswordInput
    const onPasswordInput = (e) => {
        if (e.target.value && e.target.value.length) {
            setHasPassword(true);
            if (e.keyCode === 13) {
                e.preventDefault();
                handleLogin();
            }
        } else {
            setHasPassword(false);
        }
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onLoginButton
    const onLoginButton = (e) => {
        e.preventDefault();
        handleLogin();
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onRememberMe
    const onRememberMe = (e) => {
        if (e.target.checked) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    };

    /*================================================*/
    /*================================================*/

    // EVENT: => onFormSwap
    const onFormSwap = (e) => {
        e.preventDefault();
        if (formType === 'login') {
            setFormType('register');
        }
        if (formType === 'register') {
            setFormType('login');
        }
        // TODO: swap form functionality (post instead of get)
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
        BLOCK: RENDERING - FUN
    ==================================================*/

    // RENDER: => renderLogos
    const renderLogos = useCallback(() => {
        return (
            <>
                <Image src={ImageLogo_1a} alt='logo-1' position={1 - currentLogo} />
                <Image src={ImageLogo_1b} alt='logo-2' position={2 - currentLogo} />
                <Image src={ImageLogo_1c} alt='logo-3' position={3 - currentLogo} />
                <Image src={ImageLogo_1d} alt='logo-4' position={4 - currentLogo} />
                <Image src={ImageLogo_1e} alt='logo-5' position={5 - currentLogo} />
            </>
        );
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <FormContainer borderWidth={borderWidth}>
                <FunContainerLeft>
                    <IconButton onClick={onBorderGrow} data={'grow'} icon={UpSVG} />
                    <IconButton onClick={onBorderGrow} data={'shrink'} icon={DownSVG} />
                </FunContainerLeft>
                <FunContainerRight>
                    <IconButton onClick={onLogoSwap} data={'left'} icon={LeftSVG} />
                    <IconButton onClick={onLogoSwap} data={'right'} icon={RightSVG} />
                </FunContainerRight>
                <ImageContainer>{renderLogos()}</ImageContainer>
                <TitleContainer>
                    <Title>Chattr</Title>
                </TitleContainer>
                <Form onSubmit={onSubmitForm}>
                    <Input type='text' onKeyUp={onNameInput} placeholder='User name' />
                    <Input type='password' onKeyUp={onPasswordInput} placeholder='Password' />
                    <FormButton onClick={onLoginButton} text={'Sign In'} />
                    <RememberContainer>
                        <Checbox id='remember-me' type='checkbox' onClick={onRememberMe} />
                        <Label htmlFor='remember-me'>Remember me</Label>
                    </RememberContainer>
                    <Swapper href='' onClick={onFormSwap}>
                        <span>Don't have an account?</span>
                        <span>Click Here!</span>
                    </Swapper>
                    TESTING:
                    <Link to='/room'>room</Link>
                    <Link to='/eeeeeeeee'>error</Link>
                </Form>
            </FormContainer>
        </Container>
    );
}
