import { FLEX_CENTER_COL } from 'Styles/common.js';
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
    margin-top: 20px;
    ${FLEX_CENTER_COL}
`;

const Swap = styled.span`
    cursor: pointer;
    text-decoration: underline;
    color: ${({ theme }) => theme.text.link};
    &:hover {
        color: ${({ theme }) => theme.text.link_hover};
    }
`;
