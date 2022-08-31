import styled from 'styled-components';
import React from 'react';

/**
 * @props 
 */

export default function Modal(props) {
    return (
        <>
            <Overlay>
                <Container>
                    {props.children}
                </Container>
            </Overlay>
        </>
    );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    background: ${({ theme }) => theme.bg.main_1};
`;

const Container = styled.div`
    position: relative;

    width: auto;
    height: auto;
`;