import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
import React from 'react';

/**
 * @props title (String) Text to be displayed as title
 */

export default function Title(props) {
    return (
        <>
            <Container>
                <H1>{props.title ? props.title : document.title}</H1>
            </Container>
        </>
    );
}

const Container = styled.div`
    padding: ${sizes.spacing.app};

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

const H1 = styled.h1`
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
    padding: 0;
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
`;
