import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/axios.js';

// ICON COMPONENTS
import FormButton from '../../components/Buttons/FormButton.jsx';
import IconButton from '../../components/Buttons/IconButton.jsx';
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
    ButtonContainer,
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

    useLayoutEffect(() => {}, []);

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
        BLOCK: EVENTS
    ==================================================*/

    // FUNCTION: => onAccountSubmit
    const onAccountSubmit = async () => {
        console.log('===> START - onAccountSubmit');
        const name = formRef.current[0].value;
        const password = formRef.current[0].value;

        if (name.length > 3 && password.length > 3) {
            try {
                // ==> QUERY
                const url = formType + '/';
                const data = {
                    name: name,
                    password: password,
                };
                console.log('url: ', url);
                console.log('data: ', data);
                const results = await api.post(url, data);
                console.log('results.data: ', results.data);

                // ==> STORAGE
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

                if (error.response.status === 409) {
                    
                }

                console.log('===> END - onAccountSubmit - async error');
                return [error.severity + ': ' + error.routine];
            }
        } else {
            // TODO: add error to form around empty inputs || length < 3 inputs
            console.log('===> END - onAccountSubmit - input error');
            return false;
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
                <FunContainerLeft>
                    <IconButton onClick={onBorderGrow} data={'grow'} icon={UpSVG} />
                    <IconButton onClick={onBorderGrow} data={'shrink'} icon={DownSVG} />
                </FunContainerLeft>
                <FunContainerRight>
                    <IconButton onClick={onLogoSwap} data={'left'} icon={LeftSVG} />
                    <IconButton onClick={onLogoSwap} data={'right'} icon={RightSVG} />
                </FunContainerRight>
                <ImageContainer>
                    <Image src={ImageLogo_1a} alt='logo-1' position={1 - currentLogo} />
                    <Image src={ImageLogo_1b} alt='logo-2' position={2 - currentLogo} />
                    <Image src={ImageLogo_1c} alt='logo-3' position={3 - currentLogo} />
                    <Image src={ImageLogo_1d} alt='logo-4' position={4 - currentLogo} />
                    <Image src={ImageLogo_1e} alt='logo-5' position={5 - currentLogo} />
                </ImageContainer>
                <TitleContainer>
                    <Title>{document.title}</Title>
                </TitleContainer>
                <Form onSubmit={onAccountSubmit} ref={formRef}>
                    <Input type='text' placeholder='User name' />
                    <Input type='password' placeholder='Password' />
                    <ButtonContainer state={formType}>
                        <FormButton onClick={onAccountSubmit} text={'Sign In'} />
                        <FormButton onClick={onAccountSubmit} text={'Register'} />
                    </ButtonContainer>
                    <RememberContainer>
                        <Checbox id='remember-me' type='checkbox' onClick={onRememberMe} />
                        <Label htmlFor='remember-me'>Remember me</Label>
                    </RememberContainer>
                    <Swapper onClick={onFormSwap}>
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
