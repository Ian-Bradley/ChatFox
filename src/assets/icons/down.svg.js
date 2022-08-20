import styled from 'styled-components';
import React from 'react';

export default function LeftSVG(props) {
    return (
        <>
            <SVG viewBox='0 0 512 512'>
                <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='square'
                    strokeMiterlimit='10'
                    strokeWidth='48'
                    d='M112 184l144 144 144-144'
                />
            </SVG>
        </>
    );
}

const SVG = styled.svg`
    height: 100%;
    width: 100%;
`;
