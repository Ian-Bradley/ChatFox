import { transition } from '../../../styles/common.js';
import styled from 'styled-components';
import React from 'react';

// LOGO COMPONENTS
import ImageLogo_1a from '../../../assets/logos/logo_1a.png';
import ImageLogo_1b from '../../../assets/logos/logo_1b.png';
import ImageLogo_1c from '../../../assets/logos/logo_1c.png';
import ImageLogo_1d from '../../../assets/logos/logo_1d.png';
import ImageLogo_1e from '../../../assets/logos/logo_1e.png';

export default function Logos(props) {
    return (
        <>
            <Container>
                <Logo src={ImageLogo_1a} alt='logo-1' position={1 - props.currentLogo} />
                <Logo src={ImageLogo_1b} alt='logo-2' position={2 - props.currentLogo} />
                <Logo src={ImageLogo_1c} alt='logo-3' position={3 - props.currentLogo} />
                <Logo src={ImageLogo_1d} alt='logo-4' position={4 - props.currentLogo} />
                <Logo src={ImageLogo_1e} alt='logo-5' position={5 - props.currentLogo} />
            </Container>
        </>
    );
}

const Container = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;

const Logo = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
    transition: transform linear ${transition.transform};
    transform: translateX(calc(300px * ${(props) => props.position}));
`;
