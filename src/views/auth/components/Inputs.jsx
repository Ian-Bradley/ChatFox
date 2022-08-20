import { sizes, transition } from '../../../styles/common.js';
import styled from 'styled-components';
import React from 'react';

export default function Buttons(props) {
    return (
        <>
            <Container state={props.formType}>
                <TransitionContainer>
                    <Input type='text' placeholder='User name' />
                    <Input type='password' placeholder='Password' />
                </TransitionContainer>
                <TransitionContainer>
                    <Input type='text' placeholder='User name' />
                    <Input type='password' placeholder='Password' />
                </TransitionContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 84px;

    & > div:first-child {
        transform: translateX(calc(400px * ${(props) => (props.state === 'login' ? 0 : -1)}));
    }
    & > div:last-child {
        transform: translateX(calc(400px * ${(props) => (props.state === 'register' ? 0 : 1)}));
    }
`;

const TransitionContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transition: transform linear ${transition.transform};
`;

const Input = styled.input`
    width: 100%;
    height: 30px;

    padding: 0 ${sizes.spacing.app};
    margin-bottom: 12px;

    box-sizing: border-box;
    outline: none;
    border: none;

    background: ${({ theme }) => theme.color.text.light};
    color: ${({ theme }) => theme.color.text.dark};
`;
