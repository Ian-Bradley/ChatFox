import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

// COMPONENTS
import Title from 'Shared/Title/Title.jsx';
import LogoSrc from 'Assets/logos/logo_1a.png';
import FormButton from 'Shared/Buttons/FormButton.jsx';
import { Container, ErrorContainer, Error, ErrorText, Logo } from './styles.js';

export default function ErrorPage(props) {
    // States - Redux
    const user = useSelector((state) => {
        return state['user'].user;
    });

    // Hooks
    const navigate = useNavigate();

    // Events
    const onClickHome = (e) => {
        user.loggedIn ? navigate('/room', { replace: true }) : navigate('/', { replace: true });
    };

    // Components
    return (
        <Container>
            <ErrorContainer>
                <Logo src={LogoSrc} alt={'logo'} />
                <Title title={'Error'} />
                <Error>
                    <ErrorText>Unrecognized URL</ErrorText>
                    <FormButton onClick={onClickHome} text='Home' />
                </Error>
            </ErrorContainer>
        </Container>
    );
}
