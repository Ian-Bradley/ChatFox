import styled from 'styled-components';
import React from 'react';

export default function CloseSVG(props) {
    return (
        <>
            <SVG viewBox='0 0 512 512'>
                <path
                    fill='currentColor'
                    stroke='currentColor'
                    // strokeLinecap='square'
                    // strokeMiterlimit='10'
                    // strokeWidth='48'
                    d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'
                />
            </SVG>
        </>
    );
}

const SVG = styled.svg`
    height: 100%;
    width: 100%;
`;
