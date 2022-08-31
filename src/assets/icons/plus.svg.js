import styled from 'styled-components';
import React from 'react';

export default function PlusSVG(props) {
    return (
        <>
            <SVG viewBox='0 0 512 512'>
                <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='square'
                    strokeLinejoin='10'
                    strokeWidth='48'
                    d='M256 112v288M400 256H112'
                />
            </SVG>
        </>
    );
}

const SVG = styled.svg`
    height: 100%;
    width: 100%;
`;
