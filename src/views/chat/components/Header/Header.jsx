import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

// COMPONENTS
import { Container, Brand, Logo, Nav, Name } from './styles.js';
import MenuButton from 'Shared/Buttons/MenuButton.jsx';
import UserSVG from 'Assets/icons/user-circle.svg.js';
import LogoutSVG from 'Assets/icons/logout.svg.js';
import GearSVG from 'Assets/icons/gear.svg.js';
import LogoSrc from 'Assets/logos/logo_1a.png';
import Menu from 'Shared/Dropdowns/Menu.jsx';
import Title from 'Shared/Title/Title.jsx';

// REDUX
import { setLoggedOut } from 'Redux/slices/loggedIn.slice.js';
import { clearUserData } from 'Redux/slices/user.slice.js';

// UTIL
import { getCookie, deleteCookie } from 'Util/helpers/functions.js';

/**
 * @props
 */

export default function Header(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state['user'].user;
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onLogout = () => {
        console.log('===> onLogout');
        // ==> Redux
        dispatch(clearUserData());
        dispatch(setLoggedOut());
        // ==> JWT session
        console.log(getCookie('sessionid'));
        if (getCookie('sessionid')) {
            deleteCookie('sessionid');
        }
        // TODO: logout
        // ==> send api request to server and remove token from db
        // use socket
        console.log('===> END - onLogout');
    };

    /*================================================*/
    /*================================================*/

    const onPreferences = () => {
        console.log('===> onPreferences');
        // TODO: preferences menu
        // ==> open modal
        console.log('===> END - onPreferences');
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
                    <Name>{user.name}</Name>
                    <Menu icon={UserSVG}>
                        <MenuButton onClick={onLogout} icon={LogoutSVG} text={'Logout'} />
                        <MenuButton onClick={onPreferences} icon={GearSVG} text={'Preferences'} />
                    </Menu>
                </Nav>
            </Container>
        </>
    );
}
