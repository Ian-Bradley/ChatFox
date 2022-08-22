import React, { useState, useEffect, useLayoutEffect } from 'react';

// COMPONENTS
import { Track, Scrollbar } from './styles.js';

export default function ScrollBar(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    const [WSReady, setWSReady] = useState(false);

    /*================================================
        BLOCK: HOOKS
    ==================================================*/

    useLayoutEffect(() => {

    }, []);

    /*================================================*/
    /*================================================*/

    useEffect(() => {

    }, []);

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // FUNCTION: => onScroll
    const onScroll = (data) => {
        console.log('===> clickChannel');

        console.log('===> END - clickChannel');
    }; 

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Track>
            <Scrollbar></Scrollbar>
        </Track>
    );
}

// only transition opacity
// use absolute and NO top transition property