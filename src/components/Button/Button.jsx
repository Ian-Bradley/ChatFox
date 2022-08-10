import React from 'react';
// import {

// } from './styles.js';

/**
 * @props btnIcon (string)           File destinaton to find image
 * @props btnData (string || number) Data to be rendered on button (ex: total players)
 * @props btnText (string)           Text to be rendered on button
 * @props btnValue (string)          Value to be inserted into "data-value" attribute
 * @props btnClasses (string)        Main class for button and optional color class (ex: "reset-button button-green")
 * @props btnFunction (function)     Callback function for button action
 * @props btnRenderClasses (string)  Classes for modifying button render (ex: hide/show or disable interactions)
 */

export default function Button(props) {
    /*======================================
        BLOCK: EVENTS
    ========================================*/

    const onButtonClick = (e) => {
        if (e.target.getAttribute('data-value')) {
            props.btnFunction(e.target.getAttribute('data-value'));
        } else {
            props.btnFunction();
        }
    };

    /*======================================
        BLOCK: RENDERING
    ========================================*/

    const renderClasses = () => {
        let renderClasses = 'button-container';
        if (props.btnRenderClasses) {
            renderClasses += ' ' + props.btnRenderClasses;
        }
        return renderClasses;
    };

    /*======================================*/
    /*======================================*/

    const renderButtonClasses = () => {
        let buttonClasses = 'button';
        if (props.btnIcon && !props.btnText && !props.btnData) {
            buttonClasses += ' btn-icon-only';
        }
        if (props.btnClasses) {
            buttonClasses += ' ' + props.btnClasses;
        }
        return buttonClasses;
    };

    /*======================================*/
    /*======================================*/

    const renderButtonIcon = () => {
        if (props.btnIcon) {
            let iconClasses = 'btn-icon';
            if (props.btnText) {
                iconClasses += ' btn-m-left';
            }
            if (props.btnData) {
                iconClasses += ' btn-m-right';
            }
            return <img src={props.btnIcon} className={iconClasses} />;
        }
    };

    /*======================================
        BLOCK: COMPONENTS
    ========================================*/

    return (
        <div className={renderClasses()}>
            <button
                type='button'
                data-value={props.btnValue}
                className={renderButtonClasses()}
                onClick={onButtonClick}
            >
                {props.btnText} {renderButtonIcon()} {props.btnData}
            </button>
        </div>
    );
}
