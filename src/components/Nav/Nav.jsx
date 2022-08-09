import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Button from '../Button/Button.jsx';
import IconUser from '../../images/icons/user.svg';
import IconSettings from '../../images/icons/settings.svg';

// CSS
import './Nav.scss';

/**
 * @props
 */

export default function Nav(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const user = useSelector((state) => {
        return state['user'].user;
    });

    /*================================================
        BLOCK: INTERACTIONS
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
        BLOCK: DISPLAYING
    ==================================================*/

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <main className='container-nav'>
            <div className='container-title'>
                <span>{document.title}</span>
            </div>
            <nav>
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
            </nav>
        </main>
    );
}
