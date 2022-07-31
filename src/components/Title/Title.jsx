import React from 'react';
import './Title.scss';

/**
 * @props appTitle (string)
 */

export default function Title ( props ) {

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/


    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/


    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main className='container-title'>
            <div className='app-title'>
                <span>{props.appTitle}</span>
            </div>
        </main>
    );
}