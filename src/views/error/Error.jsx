import { Link } from 'react-router-dom';
import React from 'react';
import {
    Title,
    Image,
    Button,
    Container,
    ImageContainer,
    TitleContainer,
    ErrorContainer,
} from './styles.js';

export default function Error(props) {
    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onClickHome = (e) => {
        console.log('===> onClickHome');

        console.log('===> END - onClickHome');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <ErrorContainer>
                <ImageContainer>
                    <Image src={''} alt='logo' />
                </ImageContainer>
                <TitleContainer>
                    <Title>Error</Title>
                    Invalid link
                </TitleContainer>
                <Button type='button'>
                    <Link to='/'>Home</Link>
                </Button>
            </ErrorContainer>
        </Container>
    );
}
