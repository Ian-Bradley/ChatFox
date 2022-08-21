import FormButton from 'Shared/Buttons/FormButton.jsx';
import { FLEX_CENTER_ROW } from 'Styles/common.js';
import styled from 'styled-components';
import React from 'react';

/**
 * @props formType (String) Current type of form in use
 * @props onAccountSubmit (Function) Submit callback
 */

export default function Buttons(props) {
    return (
        <>
            <Container state={props.formType}>
                <FormButton onClick={props.onAccountSubmit} text={'Sign In'} />
                <FormButton onClick={props.onAccountSubmit} text={'Register'} />
            </Container>
        </>
    );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 30px;

    margin-top: 15px;
    ${FLEX_CENTER_ROW}

    & button {
        position: absolute;
        top: 0;
        left: 0;
    }
    & button:first-child {
        transform: translateX(calc(400px * ${(props) => (props.state === 'login' ? 0 : -1)}));
    }
    & button:last-child {
        transform: translateX(calc(400px * ${(props) => (props.state === 'register' ? 0 : 1)}));
    }
`;
