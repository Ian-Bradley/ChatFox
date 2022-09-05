import { KEYCODE_ENTER } from 'Util/helpers/constants.js';
import { sizes, transition } from 'Styles/common.js';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';

// COMPONENTS
import FormButton from 'Common/Buttons/FormButton.jsx';

// UTIL
import { hasSpecialCharacters } from 'Util/helpers/functions.js';
import { MAX_CHARACTERS_NAME, MAX_CHARACTERS_PASSWORD } from 'Util/helpers/constants.js';

/**
 * @props buttonText {string}
 * @props onSubmit {function}
 * @props syncHeight {function}
 */

export default function Form(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Hooks
    const [nameError, setNameError] = useState('');
    const [passError, setPassError] = useState('');
    const formRef = useRef();

    /*================================================
        BLOCK: VALIDATION
    ==================================================*/

    const validateInputs = (ref) => {
        const name = ref.current[0].value;
        const pass = ref.current[1].value;
        let errorPassword = false;
        let errorName = false;

        // ==> Name
        while (true) {
            if (!(name && name.length)) {
                setNameError('Name is required');
                errorName = true;
                break;
            }
            if (!(name.length >= MAX_CHARACTERS_NAME)) {
                setNameError('Name must be 3 characters or longer');
                errorName = true;
                break;
            }
            if (hasSpecialCharacters(name)) {
                setNameError('Name cannot contain special characters');
                errorName = true;
                break;
            }
            break;
        }

        // ==> Password
        while (true) {
            if (!(pass && pass.length)) {
                setPassError('Password is required');
                errorPassword = true;
                break;
            }
            if (!(pass.length >= MAX_CHARACTERS_PASSWORD)) {
                setPassError('Password must be 3 characters or longer');
                errorPassword = true;
                break;
            }
            break;
        }

        // ==> Reset
        !errorName && setNameError('');
        !errorPassword && setPassError('');

        // ==> END
        if (errorPassword || errorName) {
            return false;
        }

        return true;
    };

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // EVENT: onInput
    const onInput = (e) => {
        if (e.keyCode === KEYCODE_ENTER) {
            e.preventDefault();
            validateInputs(formRef) && props.onSubmit(formRef);
        }
    };

    /*================================================*/
    /*================================================*/

    // EVENT: onForm
    const onForm = (e) => {
        e.preventDefault();
        validateInputs(formRef) && props.onSubmit(formRef);
    };

    /*================================================*/
    /*================================================*/

    // EVENT: onButton
    const onButton = (e) => {
        e.preventDefault();
        validateInputs(formRef) && props.onSubmit(formRef);
    };

    /*================================================
        BLOCK: COMPONENT
    ==================================================*/

    return (
        <>
            <StyledForm onSubmit={onForm} ref={formRef}>
                <Input type='text' placeholder='Name' onKeyUp={onInput} />
                <Error error={nameError}>{nameError}</Error>
                <Input type='password' placeholder='Password' onKeyUp={onInput} />
                <Error error={passError}>{passError}</Error>
                <FormButton onClick={onButton} text={props.buttonText} />
            </StyledForm>
        </>
    );
}

/*================================================
    BLOCK: STYLES
==================================================*/

const StyledForm = styled.form`
    grid-area: 1 / 1 / 2 / 2;
    width: 100%;

    transition: transform linear ${transition.transform};

    & button {
        margin-top: 12px;
    }
`;

const Input = styled.input`
    width: 100%;
    height: 30px;

    padding: 0 ${sizes.spacing.app};
    margin-top: 12px;

    outline: none;
    border: none;

    color: ${({ theme }) => theme.text.dark};
    background: ${({ theme }) => theme.text.light};
`;

const Error = styled.div`
    width: 100%;
    height: 0;

    padding: ${(props) => (props.error ? sizes.spacing.app : 0)} 0
        ${(props) => (props.error ? '1rem' : 0)} 0;

    color: ${({ theme }) => theme.text.error};
    transition: all linear ${transition.transform};
`;
