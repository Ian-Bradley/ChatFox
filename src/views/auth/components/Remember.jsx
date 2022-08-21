import { sizes, FLEX_CENTER_ROW } from 'Styles/common.js';
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
    ${FLEX_CENTER_ROW}
`;

const Checbox = styled.input``;

const Label = styled.label`
    padding-left: ${sizes.spacing.app};
`;
