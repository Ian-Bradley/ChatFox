import { FLEX_CENTER_COL } from '../../../styles/common.js';
import styled from 'styled-components';
import React from 'react';

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
    ${FLEX_CENTER_COL}
    margin-top: 20px;
`;

const Swap = styled.span`
    cursor: pointer;
    text-decoration: underline;
    color: ${({ theme }) => theme.color.text.link};
    &:hover {
        color: ${({ theme }) => theme.color.text.link_hover};
    }
`;
