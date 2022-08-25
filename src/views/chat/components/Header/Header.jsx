import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Title from 'Shared/Title/Title.jsx';
import LogoSrc from 'Assets/logos/logo_1a.png';
import GearSVG from 'Assets/icons/gear.svg.js';
import MenuButton from 'Shared/Buttons/MenuButton.jsx';
import { Container, Brand, Logo, Nav } from './styles.js';

/**
 * @props
 */

export default function Header(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const user = useSelector((state) => {
        return state['user'].user;
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onSettings = () => {
        console.log('===> onSettings');
        console.log('===> END - onSettings');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Container>
                <Brand>
                    <Logo src={LogoSrc} alt={'logo'} />
                    <Title />
                </Brand>
                <Nav>
                    <MenuButton onClick={onSettings} icon={GearSVG} text={user.name} rounded={4} />
                </Nav>
            </Container>
        </>
    );
}
