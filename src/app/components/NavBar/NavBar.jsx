import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Button from '../Button/Button.jsx';
import IconUser from '../../images/icons/user.svg';
import IconSettings from '../../images/icons/settings.svg';

// CSS COMPONENTS
import {
    NavContainer,
    NavTitleContainer,
    NavTitle,
    Nav,
} from './styles.js';

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
    // TODO: change to nav-left and nav-right
    return (
        <NavContainer>
            <NavTitleContainer>
                <NavTitle>{document.title}</NavTitle>
            </NavTitleContainer>
            <Nav>
                <Button
                    btnClasses={'nav-settings'}
                    btnFunction={onSettings}
                    btnIcon={IconSettings}
                />
                <Button
                    btnClasses={'nav-user'}
                    btnFunction={onUser}
                    btnText={user.nickname}
                    btnIcon={IconUser}
                />
            </Nav>
        </NavContainer>
    );
}
