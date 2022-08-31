import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
import React from 'react';

/**
 * @props onRememberMe (Function) Callback to trigger localstorage/cookies
 */

export default function Remember(props) {
    return (
        <>
            <Container>
                <Checbox id='remember-me' type='checkbox' onClick={props.onRememberMe} />
                <Label htmlFor='remember-me'>Remember me</Label>
            </Container>
        </>
    );
}

const Container = styled.div`
    margin-top: 20px;
    
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

const Checbox = styled.input``;

const Label = styled.label`
    padding-left: ${sizes.spacing.app};
`;
