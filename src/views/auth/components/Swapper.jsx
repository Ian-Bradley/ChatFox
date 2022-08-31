import styled from 'styled-components';
import React from 'react';

/**
 * @props onFormSwap (Function) Callback to swap login/register forms
 */

export default function Swapper(props) {
    return (
        <>
            <Container>
                <Swap onClick={props.onFormSwap}>Don't have an account?</Swap>
                <Swap onClick={props.onFormSwap}>Click Here!</Swap>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    margin-top: 20px;

    color: ${({ theme }) => theme.text.link};
    &:hover {
        color: ${({ theme }) => theme.text.link_hover};
    }
`;

const Swap = styled.span`
    cursor: pointer;
    text-decoration: underline;
`;
