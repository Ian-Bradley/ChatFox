import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
// import IconSettings from '../../assets/icons/settings.svg';

// CSS COMPONENTS
import { Container, TitleContainer, Title, Nav, Button } from './styles.js';

/**
 * @props
 */

export default function NavBar(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const user = useSelector((state) => {
        return state['user'].user;
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onUser = () => {
        console.log('===> onUser');
        console.log('===> END - onUser');
    };

    /*======================================*/
    /*======================================*/

    const onSettings = () => {
        console.log('===> onSettings');
        console.log('===> END - onSettings');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <TitleContainer>
                <Title>{document.title}</Title>
            </TitleContainer>
            <Nav>
                {/* <Button onClick={onSettings}>{IconSettings}</Button> */}
                <Button onClick={onUser}>{user.nickname}</Button>
            </Nav>
        </Container>
    );
}
