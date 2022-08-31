import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import { Container, Brand, Logo, Nav, Name } from './styles.js';
import MenuButton from 'Shared/Buttons/MenuButton.jsx';
import GearSVG from 'Assets/icons/gear.svg.js';
import LogoSrc from 'Assets/logos/logo_1a.png';
import Menu from 'Shared/Dropdowns/Menu.jsx';
import Title from 'Shared/Title/Title.jsx';

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
                    <Name></Name>
                    <Menu icon={GearSVG}>
                        <MenuButton
                            onClick={onSettings}
                            text={user.name}
                            borderRadius={props.borderRadius}
                        />
                        <MenuButton
                            onClick={onSettings}
                            text={user.name}
                            borderRadius={props.borderRadius}
                        />
                    </Menu>
                </Nav>
            </Container>
        </>
    );
}
