import { sizes, FLEX_CENTER_ROW } from '../../../styles/common.js';
import styled from 'styled-components';
import React from 'react';

export default function Title(props) {
    return (
        <>
            <Container>
                <H1>{document.title}</H1>
            </Container>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    height: auto;
    padding: ${sizes.spacing.app};
    margin-bottom: 15px;
    ${FLEX_CENTER_ROW}
`;

const H1 = styled.h1`
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
`;
