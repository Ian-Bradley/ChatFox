import { KEYCODE_ENTER } from 'Util/helpers/constants.js';
import { sizes, transition } from 'Styles/common.js';
import React from 'react';
import styled from 'styled-components';
/**
 * @props formType (String) Current type of form in use
 * @props onAccountSubmit (Function) Submit callback
 * @props nameError (String) Current error text for name input
 * @props passwordError (String) Current error text for password input
 */

export default function Inputs(props) {
    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onInput = (e) => {
        if (e.keyCode === KEYCODE_ENTER) {
            e.preventDefault();
            props.onAccountSubmit();
        }
    };

    /*================================================
        BLOCK: COMPONENT
    ==================================================*/

    return (
        <>
            <Container state={props.formType}>
                <TransitionContainer>
                    <Input type='text' placeholder='User name' onKeyUp={onInput} />
                    <Error>{props.nameError}</Error>
                    <Input type='password' placeholder='Password' onKeyUp={onInput} />
                    <Error>{props.passwordError}</Error>
                </TransitionContainer>
                <TransitionContainer>
                    <Input type='text' placeholder='User name' onKeyUp={onInput} />
                    <Error>{props.nameError}</Error>
                    <Input type='password' placeholder='Password' onKeyUp={onInput} />
                    <Error>{props.passwordError}</Error>
                </TransitionContainer>
            </Container>
        </>
    );
}

/*================================================
    BLOCK: STYLES
==================================================*/
// STYLE: => Container
const Container = styled.div`
    position: relative;
    width: 100%;
    height: 150px;

    & > div:first-child {
        transform: translateX(calc(400px * ${(props) => (props.state === 'login' ? 0 : -1)}));
    }
    & > div:last-child {
        transform: translateX(calc(400px * ${(props) => (props.state === 'register' ? 0 : 1)}));
    }
`;
/*================================================*/
/*================================================*/
// STYLE: => TransitionContainer
const TransitionContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    transition: transform linear ${transition.transform};
`;
/*================================================*/
/*================================================*/
// STYLE: => Input
const Input = styled.input`
    width: 100%;
    height: 30px;

    padding: 0 ${sizes.spacing.app};
    margin-top: 12px;

    box-sizing: border-box;
    outline: none;
    border: none;

    color: ${({ theme }) => theme.color.text.dark};
    background: ${({ theme }) => theme.color.text.light};
`;
/*================================================*/
/*================================================*/
// STYLE: => Error
const Error = styled.div`
    width: 100%;

    padding: ${sizes.spacing.app} 0 0 0;

    color: ${({ theme }) => theme.color.text.error};
    transition: transform linear ${transition.transform};
`;
/*================================================*/
/*================================================*/
